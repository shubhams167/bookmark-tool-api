# Bookmark Tool API

## Authentication

> The Bookmark Tool API does not require any authentication to request resources.

## Exposed API endpoints

-   [`/api/bookmarks`](#endpoint-1)
-   [`/api/bookmarks/{bookmarkID}`](#endpoint-2)
-   [`/api/bookmarks/{bookmarkID}/tags`](#endpoint-3)
-   [`/api/bookmarks/{bookmarkID}/tags/{tagID}`](#endpoint-4)

## Endpoint `/api/bookmarks`

HTTP methods allowed on this endpoint are GET and POST only.

#### HTTP GET request

Use HTTP GET method on the endpoint `/api/bookmarks` to get a list of all the bookmarks.

**Response**: An array of bookmark objects in JSON.

**Example request URI**:

HTTP GET `www.bookmark.io/api/bookmarks`

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

#### HTTP POST request

Use HTTP POST method on the endpoint `/api/bookmarks` to create a new bookmark.

1. The `title` field is optional in the request body.
2. The `tags` field is optional in the request body.

**Response**: A JSON object with a message field.

**Example request URI**:

HTTP POST `www.bookmark.io/api/bookmarks`

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
