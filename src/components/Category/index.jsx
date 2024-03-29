import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import { CategoryModel } from "./CategoryModel";
import Cookies from "universal-cookie";
import Table from "../dinamic/Table";
import NavMenu from "../NavMenu";
import axios from "axios";
import FormModal from "../dinamic/Forms/FormModal";
import { faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container, Button } from "reactstrap";
import ProgressBar from "../dinamic/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = (props) => {
  let baseUrl = process.env.REACT_APP_API_LOCAL;
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = process.env.REACT_APP_API_DEV;
      break;
    case "production":
      baseUrl = process.env.REACT_APP_API_PRODUCTION;
      break;

    default:
      break;
  }
  const cookies = new Cookies();

  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  const getCategory = async () => {
    await axios
      .get(baseUrl + "categories")
      .then((response) => {
        setData(response.data.data);
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!cookies.get("form")) {
      props.history.push("/");
    } else {
      getCategory();
    }
  });

  const renderActionButtons = (title, actions = ["create"]) => {
    const renderActions = (data) => {
      switch (data) {
        case "create":
          return (
            <FormModal
              modalTitle="New"
              colorButton="success"
              icon={faPlus}
              controller={baseUrl + "category"}
              petitionType="post"
              inputs={title}
            />
          );
        case "edit":
          return (
            <FormModal
              modalTitle="Update"
              colorButton="primary"
              icon={faEdit}
              controller={baseUrl + "category"}
              petitionType="put"
              dataList={{}}
            />
          );
        case "delete":
          return (
            <Button color="danger" size="sm">
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          );

        default:
          break;
      }
    };
    return actions.map(renderActions);
  };

  return (
      <Container>
        <h5>Category List</h5>
        <div className="actionsbutton">{renderActionButtons(CategoryModel, ["create"])}</div>
        {data ? (
          <Table
            title={CategoryModel}
            data={data}
            baseUrl={baseUrl + "category"}
          />
        ) : (
          success ? <p>No data found</p> : <ProgressBar color="black" colorBar="grey"></ProgressBar>
        )}
      </Container>
  );
};

export default Category;
