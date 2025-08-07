
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const product1 = await prisma.product.create({
      data: {
        id: '3456id8', updatedAt: new Date(),
        name: 'Vitamin C 1000mg',
        description: "Vitamin C is required for a healthy immune system and good skin.",
        price: 3000,
        originalPrice: 4500,
        categoryId: 1 as number,
        stockQt: 50,
        prodimage: {
          create: { updatedAt: new Date(), image: 'https://www.alamy.com/stock-photo-vitamin-c-chewable-tablets-one-a-day-from-health-essentials-90-in-40014860.html?imageid=BF3D1229-E62A-47C3-9727-7A25A4EC2500&p=55998&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0' }
        },
      variant: {
        create: [
          {
            variant_name: '20ml', price: 800, stock_qt: 40,  updatedAt: new Date(), 
            image: {
              create: {
            updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
          } ,
        },
        id: '3456id8ttiyi',
      },

          { variant_name: '50ml', price: 650, stock_qt: 10,  updatedAt: new Date(), 
            image: {
              create: {
              updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
            }
           },
           id: '3456id8frt',
          },
          {variant_name: '100ml', price: 8990, stock_qt: 70,  updatedAt: new Date(), id: '3456id8',}

        ],
      },
    },
    });

    const product2 = await prisma.product.create({
      data: {
        id: '3456id9', updatedAt: new Date(),
        name: 'Vitamin D 1000mg',
        description: "Vitamin C is required for a healthy immune system and good skin.",
        price: 3000,
        originalPrice: 4500,
        categoryId: 1 as number,
        stockQt: 50,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/stock-photo-vitamin-c-chewable-tablets-one-a-day-from-health-essentials-90-in-40014860.html?imageid=BF3D1229-E62A-47C3-9727-7A25A4EC2500&p=55998&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0',}
          ],
        },
      variant: {
        create: [
          {
            id: '12345a', variant_name: '20ml', price: 800, stock_qt: 40,  updatedAt: new Date(), 
            image: {
              create: {
            updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
          } ,
        },
        
      },

          {
            id: '12345b', variant_name: '50ml', price: 650, stock_qt: 10,  updatedAt: new Date(), 
            image: {
             
              create: {
              updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
            }
           },
          },
          
          {id: '34ffyhhgf', variant_name: '100ml', price: 8990, stock_qt: 70,  updatedAt: new Date() }

        ],
      },
    },
    });

    const product3 = await prisma.product.create({
      data: {
        id: '3456id7', updatedAt: new Date(),
        name: 'Neurovite Forte',
        description: "good for healthy nerves and good bones.",
        price: 3000,
        originalPrice: 4500,
        categoryId: 1 as number,
        stockQt: 50,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/stock-photo-vitamin-c-chewable-tablets-one-a-day-from-health-essentials-90-in-40014860.html?imageid=BF3D1229-E62A-47C3-9727-7A25A4EC2500&p=55998&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0',}
          ],
        },
      variant: {
        create: [
          {
           id:'12345c', variant_name: '20ml', price: 800, stock_qt: 40,  updatedAt: new Date(), 
            image: {
              create: {
            updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
          } ,
        },
      },

          { id: '12345r', variant_name: '50ml', price: 650, stock_qt: 10,  updatedAt: new Date(), 
            image: {
              create: {
              updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
            }
           },
          },
          {id: '12345t', variant_name: '100ml', price: 8990, stock_qt: 70,  updatedAt: new Date() , 
           }
        ],
      },
    },
    });

    const product4 = await prisma.product.create({
      data: {
        id: '3456id67', updatedAt: new Date(),
        name: 'Folate',
        description: "For  healthy immune system and good skin.",
        price: 8000,
        originalPrice: 9700,
        categoryId: 1 as number,
        stockQt: 30,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/stock-photo-vitamin-c-chewable-tablets-one-a-day-from-health-essentials-90-in-40014860.html?imageid=BF3D1229-E62A-47C3-9727-7A25A4EC2500&p=55998&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0',}
          ],
        },
      variant: {
        create: [
          {
            id: '1234ed', variant_name: '20ml', price: 800, stock_qt: 40,  updatedAt: new Date(), 
            image: {
              create: {
            updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
          } ,
        }
      },

          {variant_name: '50ml', price: 650, stock_qt: 10,  updatedAt: new Date(), 
            image: {
              create: {
              updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
            }
           },
           id:'ggderrt54'
          },
          { id:'12344ed', variant_name: '100ml', price: 8990, stock_qt: 70,  updatedAt: new Date(),  }

        ],
      },
    },
    });
    const product5 = await prisma.product.create({
      data: {
        id: '3456id1', updatedAt: new Date(),
        name: 'Vitamin A 1000mg',
        description: "Vitamin A for good eye sigth.",
        price: 800,
        originalPrice: 9500,
        categoryId: 1 as number,
        stockQt: 100,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/stock-photo-vitamin-c-chewable-tablets-one-a-day-from-health-essentials-90-in-40014860.html?imageid=BF3D1229-E62A-47C3-9727-7A25A4EC2500&p=55998&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0',}
          ],
        },
      variant: {
        create: [
          {
            id:'123456y',
            variant_name: '20ml', price: 800, stock_qt: 40,  updatedAt: new Date(), 
            image: {
              create: {
            updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
  
          } ,
        }
      },

          {id: '123456yu' , variant_name: '50ml', price: 650, stock_qt: 10,  updatedAt: new Date(), 
            image: {
              create: {
              updatedAt: new Date(), image: 'http://localhost:3000/public/assets/20ml.jpg',
            }
           },
          },
          {id: '12345ty6', variant_name: '100ml', price: 8990, stock_qt: 70,  updatedAt: new Date(),  
            }

        ],
      },
    },
    });

    const product6 = await prisma.product.create({
      data: {
        id: '3456id4jkdf', updatedAt: new Date(),
        name: 'Apitamin 500mg',
        description: "Apitamin is required for body building and growth.",
        price: 6500,
        originalPrice: 8500,
         categoryId: 3 as number,
        stockQt: 10,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/chewable-vitamin-c-tablets-in-a-bottle-on-a-white-background-image66767217.html?imageid=ECC967C0-62D9-4B24-87B5-198875847622&p=31168&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0'},
          ],
        },
      },
    });

    const product7 = await prisma.product.create({
      data: {
        id: '3456id4ko', updatedAt: new Date(),
        name: 'Apitamin 500mg',
        description: "Apitamin is required for body building and growth.",
        price: 6500,
        originalPrice: 8500,
         categoryId: 3 as number,
        stockQt: 10,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/chewable-vitamin-c-tablets-in-a-bottle-on-a-white-background-image66767217.html?imageid=ECC967C0-62D9-4B24-87B5-198875847622&p=31168&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0'},
          ],
        },
      },
    });

    const product8 = await prisma.product.create({
      data: {
        id: '3456id34jk', updatedAt: new Date(),
        name: 'Apitamin 500mg',
        description: "Apitamin is required for body building and growth.",
        price: 600,
        originalPrice: 6500,
         categoryId: 3 as number,
        stockQt: 10,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/chewable-vitamin-c-tablets-in-a-bottle-on-a-white-background-image66767217.html?imageid=ECC967C0-62D9-4B24-87B5-198875847622&p=31168&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0'},
          ],
        },
      },
    });
    const product9 = await prisma.product.create({
      data: {
        id: '3456id4ki', updatedAt: new Date(),
        name: 'Apitamin 500mg',
        description: "Apitamin is required for body building and growth.",
        price: 6500,
        originalPrice: 8500,
         categoryId: 3 as number,
        stockQt: 10,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/chewable-vitamin-c-tablets-in-a-bottle-on-a-white-background-image66767217.html?imageid=ECC967C0-62D9-4B24-87B5-198875847622&p=31168&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0'},
          ],
        },
      },
    });
    const product10 = await prisma.product.create({
      data: {
        id: '3456idhu', updatedAt: new Date(),
        name: 'vitamin B12',
        description: "B12 is required for body building and growth.",
        price: 6500,
        originalPrice: 8500,
         categoryId: 3 as number,
        stockQt: 10,
        prodimage: {
          create: [
            { updatedAt: new Date(), image: 'https://www.alamy.com/chewable-vitamin-c-tablets-in-a-bottle-on-a-white-background-image66767217.html?imageid=ECC967C0-62D9-4B24-87B5-198875847622&p=31168&pn=1&searchId=e45202b20d0d60de0af76d51116206b3&searchtype=0'},
          ],
        },
      },
    });

    console.log({ product1, product2 });
  } catch (error) {
    console.error("Error creating products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
