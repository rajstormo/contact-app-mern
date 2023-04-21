import ContactCard from "./ContactCard";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const ViewContacts = ({ contacts, onContactDelete, onContactUpdate }) => {
  console.log(contacts);

  const [query, setQuery] = useState("");

  const handleContactDelete = (contactId) => {
    onContactDelete(contactId);
  };

  const handleContactUpdate = (id, contactDetails) => {
    if (id) {
      onContactUpdate(id, contactDetails);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(query.toLowerCase());
  });

  let result = contacts;
  if (query) result = filteredContacts;

  const displayContacts =
    contacts.length !== 0 ? (
      <ul className="flex gap-3 p-5 border bg-gray-200 flex-wrap justify-center">
        {result.length === 0 && <h1 className="text-center text-3xl py-10"> No contact matches </h1>}
        {result.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onContactDelete={handleContactDelete}
            onContactUpdate={handleContactUpdate}
          />
        ))}
      </ul>
    ) : (
      <h1 className="text-center text-3xl mt-10">
        No contacts to display
      </h1>
    );

  return (
    <>
      <div className=" p-5 flex justify-between space-x-4 items-center">
        <div className="flex w-[70%] border border-black space-x-2 items-center px-2 rounded-2xl">
          <BiSearch className="text-2xl" />
          <input
            type="text"
            placeholder="Search your contacts..."
            className="flex-1 outline-none p-2 rounded-2xl"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>

        <div className="w-[30%] text-center">
          <label htmlFor="filter-box"> Filter By: </label>
          <select id="filter-box" className="border">
            <option value="name">Contact Name</option>
            <option value="phone">Phone Number</option>
          </select>
        </div>
      </div>

      {displayContacts}
    </>
  );
};

export default ViewContacts;
