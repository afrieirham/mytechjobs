import { Img } from "@chakra-ui/react";
import React from "react";

function TechIcon({ name }) {
  switch (name) {
    case "react-native":
    case "react-js":
    case "react":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/react.svg"
          alt="React"
          width="21px"
          height="21px"
        />
      );
    case "angular":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/angular-icon.svg"
          alt="Angular"
          width="21px"
          height="21px"
        />
      );
    case "node-js":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg"
          alt="Nodejs"
          width="21px"
          height="21px"
        />
      );
    case "flutter":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/flutter.svg"
          alt="Flutter"
          width="21px"
          height="21px"
        />
      );
    case "laravel":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/laravel.svg"
          alt="Laravel"
          width="21px"
          height="21px"
        />
      );
    case "vue":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/vue.svg"
          alt="Vue"
          width="21px"
          height="21px"
        />
      );
    case "django":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/django.svg"
          alt="Vue"
          width="21px"
          height="21px"
        />
      );
    case "kotlin":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/kotlin.svg"
          alt="Vue"
          width="21px"
          height="21px"
        />
      );
    case "tech":
      return null;
  }
  return <div>TechIcon</div>;
}

export default TechIcon;
