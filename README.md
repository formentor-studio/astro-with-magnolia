# Astro website with contents from Magnolia CMS
Example of a website built with Astro that is hydrated with contents from Magnolia CMS.  

The example creates a website for a Travel Agency especialized in tours around the world. The home page will list the tours and it will be one page by Tour that will show the detail of the tour.

![Travel website](./_docs/travel-website.jpg)

> You can read this article [Static websites with Astro and Magnolia CMS](https://joaquin-alfaro.medium.com/static-websites-with-astro-and-magnolia-cms-49e0da54c5bf) to know how this example was made.


## Usage
1. 🟢 Start Magnolia CMS
```bash
docker compose up -d

open http://localhost:8080
```
> **Credentials of Magnolia**  
> *Username*: superuser  
> *Password*: superuser

The instance of Magnolia includes a content app to manage **Tours**
![Magnolia Tours](./_docs/magnolia-tours.png)

2. 🏗️ Build static website with Astro. The website will be created in folder `./dist`
```bash
cd astro-with-magnolia

# Install dependencies
npm install

# Build website
npm run build
```

3. 🏁 Open preview of the website
```bash
npm run preview

open http://localhost:4321
```

4. 👋🏻 Uninstall
```bash
# Remove docker container of Magnolia
docker compose down

# Remove docker volume of Magnolia
docker volume rm astro-with-magnolia_magnolia-data

# Remove docker image of Magnolia
docker rmi formentor/magnolia-cms
```
