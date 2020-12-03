import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = gql`  
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }  
`;

export default function useLatestData() {
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();

  // Slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  // Use a side effect to fetcht eh data from the graphql endpoint
  useEffect(function () {
    // whgen the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Check for errors
        // Set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
