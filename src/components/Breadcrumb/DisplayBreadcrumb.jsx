/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router';
import './DisplayBreadcrumb.css';

export default function DisplayBreadcrumb() {
  /**
   * For the time being the data is constant.
   * This component expects the following data structure.
   * When it's being made with history data, update the datastructure and
   * pass it as a prop
   */
  const paths = {};
  paths.parents = [];
  paths.parents.push({ link: '/', name: 'Home' });
  paths.parents.push({ link: '/viewAllListings', name: 'All Listings' });
  paths.current = { link: useLocation(), name: 'Listing' };

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
