const monthName = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const getMonthNumber = (month) => {
  let monthNum = monthName[month] < 10
    ? "0" + monthName[month]
    : monthName[month].toString();
  
  return monthNum;
}

// get month wise data
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "local";

export const getMonthData = async (regexPattern) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("productTransaction");
    // get the data with the regular expression
    const data = await collection
      .find({ dateOfSale: { $regex: regexPattern } })
      .toArray();

    await client.close();
    return data;
  } catch (error) {
    console.log(error)
    return []
  }
};