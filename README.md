# How to run project

Set your api token in the `.env` file at the root of the project. Then run `npm install && npm start`

# Notes

- Pages in the project designed to be responsive. They should be working well in mobile devices.
- This was my first time using Typescript & Tailwind CSS. I've used Bootstrap before so it wasn't so hard to understand Tailwind. I just want to let you know that this project is a result of 3 days of tutorials.
- I've used Redux before but RTK was also a hard challenge for me.
- I haven't use the react-navigation library for the sake of simplicity.
- I've written unit test in other languages before but I'm kind of inexperienced about React Unit Testing.
- As far as I understand the RTK creates a slice and all necessary functions for data received from API calls when using `createApi` function. So I didn't need (and didn't want) to duplicate the product information in a separate slice. But I did it to exactly satisfy a request (i.e. to be able to delete **from redux**) in the case study document, which was:

> 5. Delete a product. (Only from redux.)
