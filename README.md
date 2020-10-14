# gatsby-source-fetch

A simple Gatsbyjs data fetching plugin to leverage the power of [axios](https://github.com/axios/axios)

## Install

`npm i gatsby-source-fetch`

## gatsby-config.js

```javascript
module.exports = {
	plugins: [
		// fetch data from some endpoint and load it into graphql
		{
			resolve: `gatsby-source-fetch`,
			options: {
				// required - root node name
				name: `footer`,

				// required - unique name to query data
				type: `html`,

				// required (unless overridden in axiosConfig) - url for endpoint
				url: `https://www.some-domain.com/common-html/header.html`,

				// optional - provide method (defaults to get)
				method: `get`,

				// optional - completely override axios config
				// see https://github.com/axios/axios#request-config
				axiosConfig: {
					headers: { Accept: "text/html" },
				},
			},
		},

		// fetch a data and save it locally
		{
			resolve: `gatsby-source-fetch`,
			options: {
				name: `Favicon`,
				type: `icon`,
				url: `https://www.some-domain.com/icons/favicon.ico`,
				axiosConfig: {
					headers: { Accept: "image/x-icon" },
				},

				// optional - if saveTo is defined it will save the data fetched to a file
				saveTo: `${__dirname}/src/images/favicon.ico`,

				// optional - if false graphql nodes will not be created for this type
				createNodes: false,
			},
		},

		// use a function instead of string for the url (thanks @michaelpumo)
		{
			resolve: `gatsby-source-fetch`
			options: {
				name: `brands`,
				type: `brands`,

				url: async () => {
					const api = await Prismic.getApi("https://my-website.prismic.io/api/v2")
					const brands = await api.getSingle("brands")
					const { url } = brands.data.summary
					return url
				},
				method: `get`,
				axiosConfig: {
				headers: { Accept: "text/csv" },
				},
				saveTo: `${__dirname}/src/data/brands-summary.csv`,
				createNodes: false,
			},
		},
	],
};
```

## graphql

```javascript
const { footer } = useStaticQuery(graphql`
	{
		footer {
			html
		}
	}
`);
```
