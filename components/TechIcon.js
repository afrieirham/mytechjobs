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
          alt="react logo"
          width="21px"
          height="21px"
        />
      );
    case "angular":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/angular-icon.svg"
          alt="angular logo"
          width="21px"
          height="21px"
        />
      );
    case "node-js":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg"
          alt="node.js logo"
          width="21px"
          height="21px"
        />
      );
    case "flutter":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/flutter.svg"
          alt="flutter logo"
          width="21px"
          height="21px"
        />
      );
    case "laravel":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/laravel.svg"
          alt="laravel logo"
          width="21px"
          height="21px"
        />
      );
    case "vue":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/vue.svg"
          alt="vue logo"
          width="21px"
          height="21px"
        />
      );
    case "django":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/django.svg"
          alt="django logo"
          width="21px"
          height="21px"
        />
      );
    case "kotlin":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/kotlin.svg"
          alt="kotlin logo"
          width="21px"
          height="21px"
        />
      );
    case "webflow":
      return (
        <Img
          src="https://appthisway.com/wp-content/uploads/2018/08/webflow-logo.png"
          alt="webflow logo"
          width="21px"
          height="21px"
        />
      );
    case "tech":
    default:
      return null;
  }
}

export default TechIcon;
