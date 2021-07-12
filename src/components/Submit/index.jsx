import React, { useState, useEffect } from "react";
import { SubmitModel } from "./SubmitModel";
import Cookies from "universal-cookie";
import Table from "../dinamic/Table";
import NavMenu from "../NavMenu";
import axios from "axios";
import FormModal from "../dinamic/Forms/FormModal";
import { faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container, Button } from "reactstrap";
import ProgressBar from "../dinamic/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { enviroment } from "./../../util/enviroment";

const Submit = (props) => {
  const baseUrl = enviroment();
  const cookies = new Cookies();

  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  const getSubmit = async () => {
    await axios
      .get(baseUrl + "submits")
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
      getSubmit();
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
        <h5>Submit List</h5>
        <div>{renderActionButtons(SubmitModel, ["create"])}</div>
        {data ? (
          <Table title={SubmitModel} data={data} baseUrl={baseUrl + "submit"} />
        ) : (
          success ? <p>No data found</p> : <ProgressBar color="black" colorBar="grey"></ProgressBar>
        )}
      </Container>
    </div>
  );
};

export default Submit;
