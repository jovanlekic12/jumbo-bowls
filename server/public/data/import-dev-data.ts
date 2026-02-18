import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../../models/productModel';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

dotenv.config({ path: `${__dirName}/../../config.env` });

const db = process?.env?.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD as string
);

if (!db)
  throw new Error(
    'There has been an error while connecting your password to the database in the import script. Could not connect'
  );

mongoose
  .connect(db)
  .then(() =>
    console.log('Database connection is successful in the import script')
  )
  .catch((error) => {
    'There was an error when connecting to the database in the import script';
    console.log(error);
  });

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirName}/products.json`, 'utf-8')
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Product.create(products);

    console.log('Data sucessfully loaded:');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE DATA FROM THE DATABASE
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data sucessfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// RUN FUNCTION DEPENDING ON THE LAST ARG
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
