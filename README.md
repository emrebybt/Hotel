
# NodeJs Express Hotel Project


TR ->
NodeJs-Express teknolojisi ile yazılmış otel projesi. Bu projede veri tabanı olarak MangoDb bağlantı için ise mongoose kullandım. Siteye giren kullanıcılar kayıt olup giriş yaptıktan sonra oda rezerve edebilirler. Kayıt olan kullanıcıların şifresi veritabanında 
hash'lenmiş olarak tutulur.Kullanıcı giriş yaptıktan sonra bilgileri sunucu hafızasında tutulur ve geçmiş kiralamalarını görebilir, yenileyebilir, gelecek olanları iptal edebilir.
Oda kiralandıktan sonra başka bir kullanıcı aynı tarihte odayı kiralamayı çalışırsa oda dolu hatı alacaktır. Aynı şekilde geçmiş bir tarihe kiralama yapmaya çalışırsa hata alacaktır.

EN ->

Hotel project written with Node.js-Express technology. In this project, MongoDB is used as the database, and Mongoose is used for connection. Users entering the site can register and log in to reserve rooms. The passwords of registered users are stored in the database as hashed. After a user logs in, their information is stored in the server memory, and they can view, renew, or cancel past reservations.

If a room is already booked on a particular date, another user trying to book the same room on the same date will receive a room occupied error. Similarly, if a user tries to make a reservation for a past date, an error will be encountered.


## Kullanılan Teknolojiler / Used Technologies

- Express Js

- Express-Session

- MongoDb

- Mongoose

- Bcrypt.js

- Pug View Engine

- Nodemon

- Cookie-Parser
  
## Kullanım / Usage

TR ->

Projeyi kullanmak için bağlantı ayarlarını kendinize göre yapmanız gereklidir

EN ->

To use the project, you need to configure the connection settings according to your own setup.

```javascript
mongoose.connect('mongodb://127.0.0.1:27017/DataBaseName').then(() => {
  console.log("mongodb connected.")
}).catch((err) => {
  console.log('mongodb connection error')
})
```

  
