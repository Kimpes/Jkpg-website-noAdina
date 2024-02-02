import { useState, useEffect } from "react";
let storeJson = require("./api/stores.json");

const listItems = storeJson.map((store) => <li>{store}</li>);

export default function Stores() {
  return (
    <main>
      <h1>Stores</h1>
      <ul>
        <li>butcher</li>
        <li>barber</li>
        <li>broker</li>
        <li>santa's workshop</li>
      </ul>
      <ul>{listItems}</ul>
    </main>
  );
}
