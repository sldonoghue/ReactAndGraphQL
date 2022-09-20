import { cloudinaryImage } from "@keystone-next/cloudinary";
import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";

export const ProductImage = list({
    fields :{
        image: cloudinaryImage({
            label: 'Source',
            cloudinary: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey: process.env.CLOUDINARY_KEY,
                apiSecret: process.env.CLOUDINARY_SECRET,
                folder: 'product-images',
            },
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' }),
    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product'],
        },
    },
})