import React from "react";
import { Box } from "@mui/material";
import { CardWrapper } from "../card";
export function ProfessionalExperience() {
  return (
    <Box sx={{ display: "grid", gap: "5px", gridTemplateColumns: "1fr 1fr" }}>
      <CardWrapper
        title="Material Management Management System"
        subheader="Santee Building Solutions"
        href="/"
        body={`
      Developed a comprehensive inventory management system for Santee Building Solutions 
      that digitized the entire lumber lifecycle. The application tracks materials from mill 
      purchase through warehouse receipt and final installation at construction sites. This digital
      transformation streamlined operations for the lumber supply and turnkey framing contractor,
       enabling real-time tracking and improved supply chain visibility. 
      
      *Integrations: Microsoft Sharepoint / Viewpoint Spectrum / Barcode Scanner & Printer*\n
      *Technologies used: Fastify, Prisma,MySql, Microsoft SQL Server, React, ReactRouter, MUI, ReactQuery, PWA*
  `}
      />
      <CardWrapper
        title="Resource Site"
        subheader="CF Evans Construction"
        href="/"
        body={`
      Developed a modern, collaborative intranet platform enabling Business Unit Leaders to centralize 
      and manage Standard Operating Procedures, Best Practices, and Standard Forms. This digital workplace solution
      streamlined document management and improved accessibility for employees across the organization.
      
      *Integrations: Microsoft Sharepoint / Procore*\n
      *Technologies used: Express, MongoDb, ReduxToolKit, React, Reactrouter, MUI, PWA*
  `}
      />
      <CardWrapper
        title="Electronic Billing & Compliance"
        subheader="CF Evans Construction"
        href="/"
        body={`
      Developed a collaborative portal connecting operations and accounting ERPs to faciliate the digitization of
      Subcontractor Billing from subcontractor sumbission through accounting payment. Integration included data 
      sync and transfers between Viewpoint Spectrum ERP, Procore's Project Management platform, and DocuSign for eSignature.
      
      *Integrations: Procore / Viewpoint Spectrum*\n
      *Technologies used: Express, Microsoft SQL Server, MongoDb, ReduxToolKit, React, Reactrouter, Bootstrap*
  `}
      />
      <CardWrapper
        title="Project Close-out Tool"
        subheader="CF Evans Construction"
        href="/"
        body={`
      Built a tool to facilitate in the tracking and reconciliation of Project Close-out Documents required for 
      Handover to the Owner at the end of the project. 
      
      *Integrations: Procore*\n
      *Technologies used: Express, MongoDb, ReduxToolKit, React, Reactrouter, Bootstrap*
  `}
      />
      <CardWrapper
        title="Project Update Dashboard"
        subheader="CF Evans Construction"
        href="/"
        body={`
      An interactive dashboard, built to standardize monthly projects prepared and presented by Project Managers. 
      
      *Integrations: Procore*\n
      *Technologies used: Express, MongoDb, ReduxToolKit, React, Reactrouter, Bootstrap*
  `}
      />
      <CardWrapper
        title="ERP / Data Migrations"
        subheader="CF Evans Construction"
        href="/"
        body={`
      Experience leading the and migrating data from legacy to new software solutions.
      * Sage 300 to Spectrum (2 companies)
      * Quickbooks to Spectrum (1 company)
      * Legacy Intranet to Resource Site
      * Legacy Material Management Platform to New Platform 
  `}
      />
    </Box>
  );
}
