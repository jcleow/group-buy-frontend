/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Breadcrumb } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router';

export default function DisplayBreadcrumb() {
  const paths = {};
  paths.parents = [];
  paths.parents.push({ link: '/', name: 'Home' });
  paths.current = { link: useLocation(), name: 'Listing' };

  const createBreadcrumbParentItems = () => paths.parents.map((parentPath) => <Breadcrumb.Item href={parentPath.link}>{parentPath.name}</Breadcrumb.Item>);

  const createBreadcrumbActiveItem = () => (
    <Breadcrumb.Item href={paths.current.link} active>{paths.current.name}</Breadcrumb.Item>
  );

  return (
    <Breadcrumb>
      {createBreadcrumbParentItems()}

      {/* <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
    </Breadcrumb>
  );
}
