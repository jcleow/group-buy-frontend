/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router';
import './DisplayBreadcrumb.css';

export default function DisplayBreadcrumb() {
  const paths = {};
  paths.parents = [];
  paths.parents.push({ link: '/', name: 'Home' });
  paths.parents.push({ link: '/viewAllListings', name: 'All Listings' });
  paths.current = { link: useLocation(), name: 'Listing' };
  console.log(paths);

  const createBreadcrumbItems = () => (
    <Breadcrumb>
      {paths.parents.map((parentPath) => (
        <Breadcrumb.Item href={parentPath.link}>{parentPath.name}</Breadcrumb.Item>
      ))}
      <Breadcrumb.Item href={paths.current.link} active>{paths.current.name}</Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <div className="mt-4 breadcrumb-listing">
      {createBreadcrumbItems()}
    </div>
  );
}
