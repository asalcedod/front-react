import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { enviroment } from "./../../util/enviroment";
import { ProductModel } from "./ProductModel";
import NavMenu from "../NavMenu";
import Table from "../dinamic/Table";
import axios from "axios";
import FormModal from "./Form/FormModalProduct";
import { faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container, Button } from "reactstrap";
import ProgressBar from "../dinamic/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products = (props) => {
  const baseUrl = enviroment();
  const cookies = new Cookies();

  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  const getProducts = async () => {
    await axios
      .get(baseUrl + "products")
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
      props.history.push("/Submit");
    } else {
      getProducts();
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
              controller={baseUrl + "submit"}
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
              controller={baseUrl + "submit"}
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
    <div className="Container">
      <NavMenu />
      <Container>
        <h5>Products List</h5>
        <div>{renderActionButtons(ProductModel, ["create"])}</div>
        {data ? (
          <Table
            title={ProductModel}
            data={data}
            baseUrl={baseUrl + "product"}
          />
        ) : (
          success ? <p>No data found</p> : <ProgressBar color="black" colorBar="grey"></ProgressBar>
        )}
      </Container>
    </div>
  );
};

export default Products;
