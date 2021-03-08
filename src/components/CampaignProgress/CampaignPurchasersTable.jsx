import React, { useEffect, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useParams } from 'react-router-dom';
import { generatePaginationOptions, tableColumns } from '../utility/campaignProgressHelper.jsx';
import {
  loadCurrListingPurchases, CampaignProgressContext, updatePurchaseDateDelivered,
} from '../../campaignProgressStore.jsx';
import { convertToDdMm } from '../../helper.js';

export default function CampaignPurchasersTable() {
  const { campaignStore, dispatchCampaign } = useContext(CampaignProgressContext);
  // const { listingId } = useParams();
  // useEffect(() => {
  //   // pass in dispatch fn and currListingId
  //   loadCurrListingPurchases(dispatchCampaign, listingId);
  // }, []);
  // Assign an index based ID to each purchase (this ID is subject to change during filtering)
  const indexAllPurchases = campaignStore.allPurchases.map((purchase, idx) => ({
    ...purchase,
    serialNum: idx + 1,
    createdAt: convertToDdMm(new Date(purchase.createdAt)),
    dateDelivered: (
      purchase.dateDelivered !== null ? convertToDdMm(new Date(purchase.dateDelivered)) : null),
  }));

  return (
    <div className="purchaser-table-container">
      <BootstrapTable
        keyField="id"
        data={indexAllPurchases}
        columns={tableColumns}
        pagination={paginationFactory(generatePaginationOptions(indexAllPurchases))}
        cellEdit={cellEditFactory({
          mode: 'click',
          blurToSave: false,
          afterSaveCell: (oldDate, newDate, row, column) => { updatePurchaseDateDelivered(
            dispatchCampaign, campaignStore.currListingId, row.id, newDate,
          );
          },

        })}
        striped
        bordered={false}
        hover
        condensed
      />
    </div>
  );
}
