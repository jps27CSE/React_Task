import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Checkbox, List } from "antd";
import axios from "axios";

const Problem2 = () => {
  const [contacts, setContacts] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);
  const [Content, setContent] = useState([]);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showUSContacts, setShowUSContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://contact.mediusware.com/api/contacts/?format=json")
      .then((response) => {
        const responseData = response.data;
        if (responseData && responseData.results) {
          setContent(responseData.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShowAllContacts = () => {
    setContacts(Content);
    setShowAllContacts(true);
    setShowUSContacts(false);
    setOnlyEven(false);
  };

  const handleShowUSContacts = () => {
    const usContacts = Content.filter(
      (contact) => contact.country.name === "United States"
    );
    setContacts(usContacts);
    setShowUSContacts(true);
    setShowAllContacts(false);
    setOnlyEven(false);
  };

  const handleShowEvenIDs = () => {
    const evenIDContacts = Content.filter((contact) => contact.id % 2 === 0);
    setContacts(evenIDContacts);
    setShowAllContacts(false);
    setShowUSContacts(false);
    setOnlyEven(true);
  };

  const handleSearch = () => {
    const filteredContacts = Content.filter((contact) =>
      contact.country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContacts(filteredContacts);
    setShowAllContacts(false);
    setShowUSContacts(false);
    setOnlyEven(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Button
            style={{ backgroundColor: "#46139f", color: "white" }}
            type="primary"
            onClick={handleShowAllContacts}
          >
            All Contacts
          </Button>
          <Button
            style={{ backgroundColor: "#ff7f50", color: "white" }}
            type="warning"
            onClick={handleShowUSContacts}
          >
            US Contacts
          </Button>
          <Button type="danger" onClick={handleShowEvenIDs}>
            Even IDs
          </Button>
        </div>

        <div className="mt-3">
          <Input
            placeholder="Search by country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Phone</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.phone}</td>
                <td>{item.country.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problem2;
