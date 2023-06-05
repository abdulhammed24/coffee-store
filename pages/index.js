import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=6.678986905053477%2C3.165150920591198",
    options
  );

  const data = await response.json();
  // console.log(data.results);
  // .catch((err) => console.error(err));

  return {
    props: {
      coffeeStores: data.results,
    },
  };
}

export default function Home(props) {
  // console.log("props", props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/vercel.svg" />
        <meta name="description" content="allows you to discover coffee stores" />
      </Head>

      <main className={styles.main}>
        <Banner
          // buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          buttonText={"View stores nearby"}
          // handleOnClick={handleOnBannerBtnClick}
        />
        {/* {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>} */}
        {/* {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>} */}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero image" priority={true} />
        </div>

        {/* {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )} */}

        <div className={styles.sectionWrapper}>
          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Lagos stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore, index) => {
                  return (
                    <Card
                      key={coffeeStore.id || index}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      href={`/coffee-store/${coffeeStore.id}`}
                      className={styles.card}
                      priority={true}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
