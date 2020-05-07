# Bookmark Tool API

## Introduction

The Bookmark Tool API is a backend API for a bookmarking application build using Node.js, Express.js, and MongoDB.

## How to setup Bookmark Tool API server?

To setup this API server on a local machine, follow the following steps:

1. Clone the repository using `git clone https://github.com/shubhams167/bookmark-tool-api.git`.
2. `cd` to _bookmark-tool-api_ and run `npm install`.
3. Create a `.env`<sup>1</sup> file and write your MongoDB connection string in the variable `DB_CONN_STRING`.
4. Finally, run `npm run start` to start the server. For development purpose, `npm run dev-start` can be used which uses `nodemon` to run the server.
5. Now, all the API endpoints can be accessed at `http://localhost:3000`.

<sup>1</sup> My `.env` file had `DB_CONN_STRING=mongodb+srv://admin:admin@cluster0-y8tam.mongodb.net/BookmarkTool` in case you want to connect to my database instance.

## Authentication

The Bookmark Tool API does not require any authentication to request resources.

## Exposed API endpoints

-   [`/api/bookmarks`](#using-endpoint-apibookmarks)
-   [`/api/bookmarks/{bookmarkID}`](#using-endpoint-apibookmarksbookmarkid)
-   [`/api/bookmarks/{bookmarkID}/tags`](#using-endpoint-apibookmarksbookmarkidtags)
-   [`/api/bookmarks/{bookmarkID}/tags/{tagID}`](#using-endpoint-apibookmarksbookmarkidtagstagid)
-   [`/api/tags`](#using-endpoint-apitags)
-   [`/api/tags/{tag}`](#using-endpoint-apitagstag)

## Using endpoint `/api/bookmarks`

HTTP methods allowed on this endpoint are GET, and POST only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/bookmarks` to get all the bookmarks.

**Response**:

Array of JSON objects each representing a bookmark having fields `_id`, `link`, `title`, `publisher`, `tags`, `createdAt`, `updatedAt`, and `__v`. The `tags` field will be an array of JSON objects having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/bookmarks`  
Content-Type: _application/json_

**Example response**:

```json
[
	{
		"tags": [
			{
				"_id": "5eb42b4cb245791c50873fbe",
				"title": "node.js",
				"__v": 0,
				"createdAt": "2020-05-07T15:37:48.737Z",
				"updatedAt": "2020-05-07T15:37:48.737Z"
			}
		],
		"_id": "5eb42a008a880f4cc4c0a02c",
		"link": "https://www.youtube.com/watch?v=dGcsHMXbSOA",
		"title": "React Tutorial For Beginners - YouTube",
		"publisher": "Youtube",
		"createdAt": "2020-05-07T15:32:16.912Z",
		"updatedAt": "2020-05-07T15:37:48.792Z",
		"__v": 4
	}
]
```

### HTTP POST request

Use HTTP POST method on the endpoint `/api/bookmarks` to create a new bookmark. Things to note are:

1. The `title` field is optional in the request body.
2. If `title` is not provided then it will be automatically fetched and filled.
3. The `tags` field is optional in the request body.

**Response**:

A JSON object with field `message` containing either success message or error message in case the request fails.

**Example request**:

URI: HTTP POST `www.bookmark.io/api/bookmarks`  
Content-Type: _application/json_  
Request body:

```json
{
	"link": "https://www.youtube.com",
	"title": "Youtube",
	"publisher": "Youtube India",
	"tags": [
		{
			"title": "entertainment"
		},
		{
			"title": "chill"
		}
	]
}
```

**Example response**:

```json
{
	"message": "Saved successfully"
}
```

## Using endpoint `/api/bookmarks/{bookmarkID}`

HTTP methods allowed on this endpoint are GET, PATCH, and DELETE only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/bookmarks/{bookmarkID}` to get a specific bookmark object having `_id` same as `bookmarkID`.

**Response**:

A JSON object representing a bookmark having fields `_id`, `link`, `title`, `publisher`, `tags`, `createdAt`, `updatedAt`, and `__v`. The `tags` field will be an array of JSON objects having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c`  
Content-Type: _application/json_

**Example response**:

```json
{
	"tags": [
		{
			"_id": "5eb42b4cb245791c50873fbe",
			"title": "node.js",
			"__v": 0,
			"createdAt": "2020-05-07T15:37:48.737Z",
			"updatedAt": "2020-05-07T15:37:48.737Z"
		}
	],
	"_id": "5eb42a008a880f4cc4c0a02c",
	"link": "https://www.youtube.com/watch?v=dGcsHMXbSOA",
	"title": "React Tutorial For Beginners - YouTube",
	"publisher": "Youtube",
	"createdAt": "2020-05-07T15:32:16.912Z",
	"updatedAt": "2020-05-07T15:37:48.792Z",
	"__v": 4
}
```

### HTTP PATCH request

Use HTTP PATCH method on the endpoint `/api/bookmarks/{bookmarkID}` to update `title`, or `publisher` fields of a specific bookmark having `_id` same as `bookmarkID`.

**Response**:

A JSON object with field `message` containing either success message or error message in case the request fails.

**Example request**:

URI: HTTP PATCH `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c`  
Content-Type: _application/json_
Request body:

```json
{
	"title": "Youtube"
}
```

**Example response**:

```json
{
	"message": "Update successful"
}
```

### HTTP DELETE request

Use HTTP DELETE method on the endpoint `/api/bookmarks/{bookmarkID}` to remove a specific bookmark having `_id` same as `bookmarkID`.

**Response**:

A JSON object with field `message` containing either success message or error message in case the request fails.

**Example request**:

URI: HTTP DELETE `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c`  
Content-Type: _application/json_

**Example response**:

```json
{
	"message": "Bookmark removed"
}
```

## Using endpoint `/api/bookmarks/{bookmarkID}/tags`

HTTP methods allowed on this endpoint are GET, and POST only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/bookmarks/{bookmarkID}/tags` to get all the tags associated with the bookmark having `_id` same as `bookmarkID`.

**Response**:

Array of JSON objects each representing a tag having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c/tags`  
Content-Type: _application/json_

**Example response**:

```json
[
	{
		"_id": "5eb42b4cb245791c50873fbe",
		"title": "node.js",
		"__v": 0,
		"createdAt": "2020-05-07T15:37:48.737Z",
		"updatedAt": "2020-05-07T15:37:48.737Z"
	}
]
```

### HTTP POST request

Use HTTP POST method on the endpoint `/api/bookmarks/{bookmarkID}/tags` to add a new tag to the bookmark having `_id` same as `bookmarkID`.

**Response**:

A JSON object with field `message` containing either success message or error message in case the request fails.

**Example request**:

URI: HTTP POST `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c/tags`  
Content-Type: _application/json_  
Request body:

```json
{
	"title": "politics"
}
```

**Example response**:

```json
{
	"message": "Tag added"
}
```

## Using endpoint `/api/bookmarks/{bookmarkID}/tags/{tagID}`

HTTP methods allowed on this endpoint are GET, and DELETE only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/bookmarks/{bookmarkID}/tags/{tagID}` to get a tag, having `_id` same as `tagID`, associated with the bookmark having `_id` same as `bookmarkID`.

**Response**:

A JSON object representing a tag having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c/tags/5eb42b4cb245791c50873fbe`  
Content-Type: _application/json_

**Example response**:

```json
{
	"_id": "5eb42b4cb245791c50873fbe",
	"title": "node.js",
	"__v": 0,
	"createdAt": "2020-05-07T15:37:48.737Z",
	"updatedAt": "2020-05-07T15:37:48.737Z"
}
```

### HTTP DELETE request

Use HTTP GET method on the endpoint `/api/bookmarks/{bookmarkID}/tags/{tagID}` to delete a tag, having `_id` same as `tagID`, associated with the bookmark having `_id` same as `bookmarkID`.

**Response**:

A JSON object with field `message` containing either success message or error message in case the request fails.

**Example request**:

URI: HTTP DELETE `www.bookmark.io/api/bookmarks/5eb42a008a880f4cc4c0a02c/tags/5eb42b4cb245791c50873fbe`  
Content-Type: _application/json_

**Example response**:

```json
{
	"message": "Tag removed"
}
```

## Using endpoint `/api/tags`

HTTP method allowed on this endpoint is GET only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/tags` to get all tags.

**Response**:

Array of JSON objects each representing a tag having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/tags`  
Content-Type: _application/json_

**Example response**:

```json
[
	{
		"_id": "5eb42b4cb245791c50873fbe",
		"title": "node.js",
		"__v": 0,
		"createdAt": "2020-05-07T15:37:48.737Z",
		"updatedAt": "2020-05-07T15:37:48.737Z"
	},
	{
		"_id": "5eb44b646b162c41ac93d55d",
		"title": "education",
		"__v": 0,
		"createdAt": "2020-05-07T17:54:44.587Z",
		"updatedAt": "2020-05-07T17:54:44.587Z"
	}
]
```

## Using endpoint `/api/tags/{tag}`

HTTP method allowed on this endpoint is GET only.

### HTTP GET request

Use HTTP GET method on the endpoint `/api/tags/{tag}` to get all bookmarks tagged with `tag`. The `tag` is case-insensitive.

**Response**:

Array of JSON objects each representing a bookmark having fields `_id`, `link`, `title`, `publisher`, `tags`, `createdAt`, `updatedAt`, and `__v`. The `tags` field will be an array of JSON objects having fields `_id`, `title`, `createdAt`, `updatedAt`, and `__v`. If the request fails, response will be a JSON object with field `message` containing error message.

**Example request**:

URI: HTTP GET `www.bookmark.io/api/tags/trump`  
Content-Type: _application/json_

**Example response**:

```json
[
	{
		"tags": [
			{
				"_id": "5eb4673e546a0527085bb9f7",
				"title": "politics",
				"__v": 0,
				"createdAt": "2020-05-07T19:53:34.885Z",
				"updatedAt": "2020-05-07T19:53:34.885Z"
			},
			{
				"_id": "5eb467dd546a0527085bb9fd",
				"title": "Trump",
				"__v": 0,
				"createdAt": "2020-05-07T19:56:13.947Z",
				"updatedAt": "2020-05-07T19:56:13.947Z"
			}
		],
		"_id": "5eb4673e546a0527085bb9f6",
		"link": "https://www.nytimes.com/2020/04/14/us/politics/trump-total-authority-claim.html",
		"title": "Trump's Total Authority Claim Is Rejected Across Ideological Lines - The New York Times",
		"publisher": "NY Times",
		"createdAt": "2020-05-07T19:53:34.835Z",
		"updatedAt": "2020-05-07T20:02:26.148Z",
		"__v": 4
	}
]
```
