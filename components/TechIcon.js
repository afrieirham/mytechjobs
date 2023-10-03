import { Img } from "@chakra-ui/react";
import React from "react";

function TechIcon({ name, size = "21px" }) {
  switch (name) {
    case "react-native":
    case "react-js":
    case "react":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/react.svg"
          alt="react logo"
          width={size}
          height={size}
        />
      );
    case "angular":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/angular-icon.svg"
          alt="angular logo"
          width={size}
          height={size}
        />
      );
    case "node-js":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg"
          alt="node.js logo"
          width={size}
          height={size}
        />
      );
    case "flutter":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/flutter.svg"
          alt="flutter logo"
          width={size}
          height={size}
        />
      );
    case "laravel":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/laravel.svg"
          alt="laravel logo"
          width={size}
          height={size}
        />
      );
    case "vue":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/vue.svg"
          alt="vue logo"
          width={size}
          height={size}
        />
      );
    case "django":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/django.svg"
          alt="django logo"
          width={size}
          height={size}
        />
      );
    case "kotlin":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/kotlin.svg"
          alt="kotlin logo"
          width={size}
          height={size}
        />
      );
    case "ruby-on-rails":
      return (
        <Img
          src="https://github.com/get-icon/geticon/raw/master/icons/rails.svg"
          alt="kotlin logo"
          width={size}
          height={size}
        />
      );
    case "webflow":
      return (
        <Img
          src="https://appthisway.com/wp-content/uploads/2018/08/webflow-logo.png"
          alt="webflow logo"
          width={size}
          height={size}
        />
      );
    case "tech":
    default:
      return null;
  }
}

export default TechIcon;
