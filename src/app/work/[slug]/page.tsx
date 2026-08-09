import { notFound } from "next/navigation";
import {
  Meta,
  Schema,
  Button,
  Column,
  Flex,
  Heading,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { projectsList, getImageUrl } from "@/resources/projects";
import { ScrollToHash } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return projectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const project = projectsList.find((p) => p.slug === slugPath);

  if (!project) return {};

  return Meta.generate({
    title: project.title,
    description: project.description,
    baseURL: baseURL,
    image: getImageUrl(project.coverImage),
    path: `${work.path}/${project.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const project = projectsList.find((p) => p.slug === slugPath);

  if (!project) {
    notFound();
  }

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" style={{ width: "100%" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${project.slug}`}
        title={project.title}
        description={project.description}
        image={getImageUrl(project.coverImage)}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Navigation Breadcrumb */}
      <Column maxWidth="s" gap="16" horizontal="center" align="center" marginTop="24">
        <SmartLink href="/work">
          <Text variant="label-strong-m" onBackground="brand-medium">
            ← Back to Projects
          </Text>
        </SmartLink>
        <Heading variant="display-strong-m" style={{ textAlign: "center", marginTop: "8px" }}>
          {project.title}
        </Heading>
        <Text variant="label-default-s" onBackground="neutral-weak">
          Category: {project.category}
        </Text>
      </Column>

      {/* Big Cover Image */}
      <Column fillWidth style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
        <img
          src={getImageUrl(project.coverImage)}
          alt={project.title}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "560px",
            objectFit: "cover",
            border: "1px solid var(--neutral-border-weak)",
            borderRadius: "16px",
          }}
        />
      </Column>

      {/* Project Intro Description */}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs" paddingX="m" gap="16">
        <Heading as="h2" variant="heading-strong-l">
          Project Overview
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-strong">
          {project.description}
        </Text>
        
        {project.behanceLink && (
          <Flex fillWidth gap="8" marginTop="12">
            <Button
              href={project.behanceLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="m"
              weight="strong"
              suffixIcon="arrowUpRight"
              label="View Full Case Study on Behance"
              style={{ width: "fit-content" }}
            />
          </Flex>
        )}
      </Column>

      {/* Divider */}
      <Line fillWidth style={{ opacity: 0.3, margin: "24px 0" }} />

      {/* Stacked Work Images in Reading Order */}
      <Column fillWidth gap="m" paddingX="l">
        {project.images.map((img, index) => (
          <Column key={index} fillWidth style={{ position: "relative" }} marginBottom="16">
            <img
              src={getImageUrl(img)}
              alt={`${project.title} - Step ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                border: "1px solid var(--neutral-border-weak)",
              }}
              loading="lazy"
            />
          </Column>
        ))}
      </Column>

      {/* Related Projects Section */}
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related Projects
        </Heading>
        <Projects exclude={[project.slug]} range={[1, 2]} />
      </Column>
      
      <ScrollToHash />
    </Column>
  );
}
