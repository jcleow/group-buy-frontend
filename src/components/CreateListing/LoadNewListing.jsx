import React from 'react';

export default function LoadNewListing({ setMode }) {
  return (
    <div className="container d-flex flex-column justify-content-center mt-5">
      <h3 className="text-center"> Loading your new listing...</h3>
      <div className="text-center">
        <img className="spinner-gif" src="spinner.gif" alt="Loading your new listing" />
      </div>
    </div>

  );
}
