import React from "react";
import { projectsData } from "../../data/projectsData";
import ProjectClient from "./ProjectClient";

export async function generateStaticParams() {
  return Object.keys(projectsData).map((category) => ({
    category: category,
  }));
}

export default async function ProjectDetailsPage({ params }) {
  const { category } = await params;
  return <ProjectClient category={category} />;
}
