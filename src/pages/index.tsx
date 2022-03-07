import React from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

interface DataProps {
	exampleImage: {
		remoteImage: ImageDataLike;
	};
}

export default function Page({ data, location }: PageProps<DataProps>) {
	return <GatsbyImage image={getImage(data.exampleImage.remoteImage)} alt="" />;
}

export const query = graphql`
	{
		exampleImage {
			remoteImage {
				childImageSharp {
					gatsbyImageData
				}
			}
		}
	}
`;
