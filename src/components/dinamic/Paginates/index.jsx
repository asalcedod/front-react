import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginates = ({ pages }) => {
  const renderItems = () => {
    let array = [];
    for (let index = 1; index <= pages; index++) {
      array.push(index);
    }
    return array;
  };
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      {renderItems().map((num) => {
        return (
          <PaginationItem>
            <PaginationLink first href="#" />
            {num}
          </PaginationItem>
        );
      })}
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
    </Pagination>
  );
};

export default Paginates;
