import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useQuery } from "react-query";
import axios from "axios";
import Toggle from "./Toggle";
import {
  Box,
  Stack,
  Input,
  Image,
  Button,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";

function Main() {
  const [search, setSearch] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState("");
  const [children, setChildren] = useState("");
  const [pets, setPets] = useState("");

  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: `${search}`,
      checkin: `${checkIn}`,
      checkout: `${checkOut}`,
      adults: `${adult}`,
      children: `${children}`,
      pets: `${pets}`,
    },
    headers: {
      "X-RapidAPI-Key": "5e3e581014msh29e76e0e097ada5p1e9877jsn7f31553e9ffc",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };
  const fetchDestination = () => {
    return axios.request(options);
  };

  const onSuccess = (data) => {
    console.log("preform side effect after data fetching ", data);
  };
  const onError = (error) => {
    console.log("preform side effect after encountering error ", error);
  };

  const { isLoading, data, refetch, isError, error, isFetching } = useQuery(
    "locations",
    fetchDestination,
    {
      onError,
      onSuccess,
      enabled: false,
    }
  );

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isFetching) {
    return <h1>....Fetching.....</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Box>
        <Flex pb="10" px="8">
          <Text
            as="h3"
            fontSize={["48px", "48px", "60px"]}
            w="100%"
            textAlign="center"
          >
            TRAVEL BETTER
          </Text>
          <Toggle />
        </Flex>

        <Box pt="20" pb="10" px="8" mx="auto">
          <Stack
            spacing="4"
            direction="column"
            w={["none", "none", "50%"]}
            mx="auto"
          >
            <Input
              type="text"
              placeholder="Enter Destination"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Input
              variant="outline"
              borderRadius="5px"
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
            <Input
              variant="outline"
              borderRadius="5px"
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
            <Input
              variant="outline"
              borderRadius="5px"
              type="number"
              placeholder="Adults"
              value={adult}
              onChange={(e) => {
                setAdult(e.target.value);
              }}
            />
            <Input
              variant="outline"
              borderRadius="5px"
              type="number"
              placeholder="Children"
              value={children}
              onChange={(e) => {
                setChildren(e.target.value);
              }}
            />
            <Input
              variant="outline"
              borderRadius="5px"
              type="number"
              placeholder="Pets"
              value={pets}
              onChange={(e) => {
                setPets(e.target.value);
              }}
            />
            <Button onClick={refetch} colorScheme="teal">
              Search
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box h="fit-content">
        {data?.data?.results?.map((location) => {
          return (
            <Box key={location.id} borderRadius="lg" mx="5" h="fit-content">
              <Stack
                direction={["column", "column", "row"]}
                w={["none", "none", "100%"]}
                mx="auto"
                my="4"
                _hover={{
                  background: "green.50",
                  color: "teal.500",
                  boxShadow: "outline",
                }}
                borderRadius="lg"
              >
                <Box
                  w={["none ", "none", "40%"]}
                  fontSize="16px"
                  fontWeight="700"
                  p="4"
                >
                  <p>Address: {location.address}</p>
                  <p>City: {location.city}</p>
                  <p>Name: {location.name}</p>
                  <p>Bathrooms: {location.bathrooms}</p>
                  <p>Bedrooms: {location.bedrooms}</p>
                  <p>Beds: {location.beds}</p>
                  <p>Persons: {location.persons}</p>
                  <p>ReviewsCount: {location.reviewsCount}</p>
                  <p>Rating: {location.rating}</p>
                  <p>Type: {location.type}</p>
                  <p>CancelPolicy: {location.cancelPolicy}</p>
                  <p>
                    Amenities: {location?.previewAmenities?.[0]},
                    {location?.previewAmenities?.[1]},
                    {location?.previewAmenities?.[2]}
                  </p>
                  <p>
                    Price: {location?.price.rate}
                    {location?.price.currency}
                  </p>
                </Box>

                <Box w={["none ", "none", "60%"]}>
                  <SimpleGrid w="100%">
                    <Carousel width="100%">
                      {location.images.map((image) => (
                        <Image
                          h={["200px", "400px", "400px"]}
                          w={["200px", "400px", "400px"]}
                          objectFit="cover"
                          borderRadius="lg"
                          src={image}
                          alt="/"
                        />
                      ))}
                    </Carousel>
                  </SimpleGrid>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default Main;
