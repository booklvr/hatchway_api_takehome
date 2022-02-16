<h1 align="center">Welcome to hatchways api takehome 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This is a take home assignment from hatchway. It is an API that fetches data from the hatchway API and then sorts the response data according to provided key value pairs. (id, likes, reads, popularity). If multiple tags are provided, duplicates are removed from the response.

<table>
  <tr>
    <th>
      Field
    </th>
    <th>
      Type
    </th>
    <th>
      Description
    </th>
    <th>
      Default
    </th>
    <th>
      Example
    </th>
  </tr>
  <tr>
    <td>tags</td>
    <td>String (optional)</td>
    <td>A comma separated list of tags.</td>
    <td>N/A</td>
    <td>science,tech</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>String (optional)</td>
    <td>The field to sort the posts by.  <br/>
    The acceptable fields are:
      <ul>
        <li>id</li>
        <li>reads</li>
        <li>likes</li>
        <li>popularity</li>
      </ul>
    </td>
    <td>id</td>
    <td>popularity</td>
    <tr>
      <td>direction</td>
      <td>String (optional)</td>
      <td>The direction for sorting.  <br/>The acceptable fields are:
        <ul>
          <li>desc</li>
          <li>asc</li>
        </ul>
      </td>
      <td>asc</td>
    </tr>
  </tr>
</table>

## Usage

```sh
yarn run server
```

## Development

```sh
yarn run start
```

## Run tests

```sh
yarn run test


```

## BONUS CACHING

```sh
git checkout cache
yarn run start

```

## Author

👤 **Nick de Waal**

- Website: nickdewaal.ca
- Github: [@booklvr](https://github.com/booklvr)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/nick-de-waal-279036221\/](https://linkedin.com/in/https://www.linkedin.com/in/nick-de-waal-279036221/)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
