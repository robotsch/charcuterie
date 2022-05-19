let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db('mydb');
  let myobj = [
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffc'),
      customers: [
        {
          name: 'Christian',
          sub_orders: [
            { menu_item_id: ObjectId('6283f1d9804b848eb5e45600'), quantity: 2 },
          ],
        },
        {
          name: 'Jack',
          sub_orders: [
            { menu_item_id: ObjectId('6283f1d9804b848eb5e45601'), quantity: 1 },
          ],
        },
      ],
      status: 'closed',
    },
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffd'),
      customers: [
        {
          name: 'Francesca',
          sub_orders: [
            { menu_item_id: ObjectId('6283f1d9804b848eb5e45602'), quantity: 2 },
          ],
        },
        {
          name: 'Jill',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 2,
            },
          ],
        },
      ],
      status: 'active',
    },
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffe'),

      customers: [
        {
          name: 'Elroy',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 2,
            },
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45603'),
              quantity: 3,
            },
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45603'),
              quantity: 10,
            },
          ],
        },

        {
          name: 'Hill',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 15,
            },
          ],
        },
      ],
      status: 'pending',
    },
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffc'),

      customers: [
        {
          name: 'Jack',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45600'),
              quantity: 8,
            },
          ],
        },
        {
          name: 'Christian',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45601'),
              quantity: 7,
            },
          ],
        },
      ],
      status: 'closed',
    },
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffd'),
      customers: [
        {
          name: 'Jill',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 9,
            },
          ],
        },
        {
          name: 'Francesca',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 12,
            },
          ],
        },
      ],
      status: 'pending',
    },
    {
      table_id: ObjectId('6283f6a703f54b7c82c5fffe'),

      customers: [
        {
          name: 'Hill',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 2,
            },
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45603'),
              quantity: 30,
            },
          ],
        },

        {
          name: 'Elroy',
          sub_orders: [
            {
              menu_item_id: ObjectId('6283f1d9804b848eb5e45602'),
              quantity: 1,
            },
          ],
        },
      ],
      status: 'active',
    },
  ];

  dbo.collection('orders').insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log('Number of documents inserted: ' + res.insertedCount);
    db.close();
  });
});
