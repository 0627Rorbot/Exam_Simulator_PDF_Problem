import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Header from "../Components/Header";
import axios from "axios";
import { useAuth } from "../Hooks/useAuth";
import S3 from "react-aws-s3";
import { v4 as uuidv4 } from "uuid";
import { AsyncCreatableSelect } from "chakra-react-select";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Alert,
  AlertIcon,
  InputLeftAddon,
  Select,
  Textarea,
  SimpleGrid,
  Stack,
  Text,
  Image,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

window.Buffer = window.Buffer || require("buffer").Buffer;

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const awsConfig = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
};

const Problem = () => {
  const [title, setTitle] = useState();
  const [isbn, setIsbn] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [condition, setCondition] = useState();
  const [images, setImages] = useState(null);
  const { token } = useAuth();
  const [success, setSuccess] = useState(false);
  const [bookResponse, setBookResponse] = useState();
  const [authors, setAuthors] = useState([]);

  const handleChangeTitle = (input) => {
    if (input && input !== "") setTitle(input);
  };

  const handleSelectTitle = (selectedInput) => {
    setTitle(selectedInput.value);
  };

  const loadOptions = (inputValue, callback) => {
    axios
      .get(
        "https://openlibrary.org/search.json?title=" +
          inputValue +
          "&fields=title&limit=5"
      )
      .then((response) => {
        const options = [];
        response.data.docs.forEach((result) => {
          options.push({
            label: result.title,
            value: result.title,
          });
        });
        callback(options);
      });
  };

  const handleChangeIsbn = async (e) => {
    e.preventDefault();
    setIsbn(e.target.value);
    if (e.target.value.length === 13 || e.target.value.length === 10) {
      try {
        const response = await axios.get(
          "https://openlibrary.org/isbn/" + e.target.value + ".json"
        );
        if (response.status === 200) {
          setBookResponse(response.data);
          setTitle(response.data.title);
          console.log("title", response.data.title);
          if (response.data.authors) {
            let tempAuthorArr = [];
            console.log("retrieved authors", response.data.authors);
            const authorsArr = response.data.authors;
            for (let i = 0; i < response.data.authors.length; i++) {
              const authorResponse = await axios.get(
                "https://openlibrary.org" + authorsArr[i].key + ".json"
              );
              if (authorResponse.status === 200)
                tempAuthorArr.push(authorResponse.data.name);
            }
            setAuthors(tempAuthorArr);
          } else {
            setAuthors([]);
          }
        }
      } catch (error) {
        console.log("Error retrieving book info", error);
      }
    } else {
      setBookResponse(null);
      setAuthors([]);
    }
  };

  const handleChangePrice = (e) => {
    e.preventDefault(); // prevent the default action
    setPrice(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeDescription = (e) => {
    e.preventDefault(); // prevent the default action
    setDescription(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeCondition = (e) => {
    e.preventDefault(); //prevent the default action
    setCondition(e.target.value); //set name to e.target.value (event)
  };

  const uploadFiles = async (files) => {
    console.log("Starting upload");
    const ReactS3Client = new S3(awsConfig);
    try {
      let imageUrls = [];
      console.log("files", files);
      for (let i = 0; i < files.length; i++) {
        const response = await ReactS3Client.uploadFile(
          files[i].file,
          uuidv4()
        );
        const imageUrl = response.location;
        imageUrls.push(imageUrl);
      }
      return imageUrls;
    } catch (error) {
      console.log("File upload error:", error);
      return null;
    }
    /*
     * {
     *   Response: {
     *     bucket: "myBucket",
     *     key: "image/test-image.jpg",
     *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
     *   }
     * }
     */
  };

  const tryCreateListing = async (e) => {
    e.preventDefault();
    try {
      const responseProfile = await axios.get(
        process.env.REACT_APP_API_BASE + "/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("PROFILE RESPONSE:", responseProfile);
      const userId = responseProfile.data.profile._id;
      const imageUrls = await uploadFiles(images);
      const responseCreateListing = await axios.post(
        process.env.REACT_APP_API_BASE + "/createlisting",
        {
          user_id: userId,
          title: title,
          isbn: isbn,
          price: price,
          description: description,
          condition: condition,
          img: imageUrls,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Create listing response: ", responseCreateListing);
      if (responseCreateListing.status === 202) setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log("Create listing error: ", error);
    }
  };

  return (
    <>
      <Header></Header>
      <form onSubmit={tryCreateListing} style={{ paddingTop: "30px" }}>
        <SimpleGrid columns={2} spacing={10} px={10}>
          <Box pt={5}>
            <FilePond
              files={images}
              onupdatefiles={setImages}
              allowMultiple={true}
              maxFiles={1}
              acceptedFileTypes={[
                "/pdf",
              ]}
              instantUpload={false}
              server={null}
              name="files"
              labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
            />
            <Button
              colorScheme="blue"
              type="submit"
              onClick={tryCreateListing}
            >
              Insert Problem
            </Button>
          </Box>
          <Box>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>PDF View</FormLabel>
                
              </FormControl>
            </Stack>
          </Box>
        </SimpleGrid>
      </form>
    </>
  );
}

export default Problem;