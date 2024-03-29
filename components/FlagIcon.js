import { Img, Text } from "@chakra-ui/react";
import React from "react";

function FlagIcon({ name, size = "36px" }) {
  switch (name) {
    case "johor":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Johor.svg"
          alt="Johor flag"
          width={size}
        />
      );
    case "kedah":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Flag_of_Kedah.svg"
          alt="Kedah flag"
          width={size}
        />
      );
    case "kelantan":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/6/61/Flag_of_Kelantan.svg"
          alt="kelantan flag"
          width={size}
        />
      );
    case "kuala-lumpur":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Kuala_Lumpur%2C_Malaysia.svg"
          alt="kuala lumpur flag"
          width={size}
        />
      );
    case "labuan":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_the_Federal_Territories_of_Malaysia.svg"
          alt="labuan flag"
          width={size}
        />
      );
    case "melaka":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Malacca.svg"
          alt="melaka flag"
          width={size}
        />
      );
    case "negeri-sembilan":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_Negeri_Sembilan.svg"
          alt="negeri sembilan flag"
          width={size}
        />
      );
    case "pahang":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Pahang.svg"
          alt="pahang flag"
          width={size}
        />
      );
    case "perak":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_Perak.svg"
          alt="perak flag"
          width={size}
        />
      );
    case "perlis":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Perlis.svg"
          alt="perlis flag"
          width={size}
        />
      );
    case "penang":
    case "pulau-pinang":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Penang_%28Malaysia%29.svg"
          alt="pulau pinang flag"
          width={size}
        />
      );
    case "putrajaya":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Putrajaya.svg"
          alt="putrajaya flag"
          width={size}
        />
      );
    case "sabah":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Sabah.svg"
          alt="sabah flag"
          width={size}
        />
      );
    case "sarawak":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Flag_of_Sarawak.svg"
          alt="sarawak flag"
          width={size}
        />
      );
    case "selangor":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Flag_of_Selangor.svg"
          alt="selangor flag"
          width={size}
        />
      );
    case "terengganu":
      return (
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Flag_of_Terengganu.svg"
          alt="terengganu flag"
          width={size}
        />
      );
    case "remote":
      return <Text as="span">🏝</Text>;
    case "all":
      return null;
  }
  return <div>FlagIcon</div>;
}

export default FlagIcon;
