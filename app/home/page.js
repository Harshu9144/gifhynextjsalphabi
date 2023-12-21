"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import axios from "axios";
import "../globals.css";
import Paginate from "../components/Paginate";
import Loader from '../components/Loader';

const Home = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //Fetching Trending GIF
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        console.log("An error occured", err);
      }
    };

    fetchData();
  }, []);

   const handleSearchChange = async (event) => {
    const inputValue = event.target.value;
     try {
      setSearch(inputValue);
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
          q: inputValue,
          limit: 100,
        },
      });
      setData(results.data.data);
      console.log(inputValue);
    } catch (err) {
      console.log("An error occured", err);
    }
   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      console.log("An error occured", err);
    }
  };

  // User Logout Handler
  const logoutHandler = async () => {
    const user = await signOut(auth);
    console.log(user);
    router.push("/");
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="gallery">
      <div className="gall-container">
        <div className="searchBox">
          <div className="m-2">
            <form className="searchBar">
              <input
                value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder="search"
                className="form-control"
                style={{ color: "#000" }}
                id="searchArea"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary mx-2"
                style={{ backgroundColor: "royalblue", padding: "10px" }}
              >
                Go
              </button>
            </form>
            <h1
              id="galaxy"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0)",
                marginTop: "1vw",
                fontSize: "2vw",
              }}
            >
              GIPHY GALAXY
            </h1>
          </div>
        </div>

        <div className="gifGallery">
         
          {currentItems.map((el) => {
            return (
              <div key={el.id} className="card">
                <img src={el.images.fixed_height.url} />
              </div>
            );
          })}
        </div>

        <div className="pageBox">
          <Paginate
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
          />
           <Button id="logout" onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
