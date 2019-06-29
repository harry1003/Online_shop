OnlineShop
===
A simple online shoping website template written by React and Node. 

## 目錄
- [Demo 連結](#demo---)
- [安裝/使用/操作方式](#----------)
- [系統說明](#----)
  * [未登錄](#---)
  * [一般登錄用戶](#------)
  * [管理者](#---)
- [提供的功能](#-----)
- [使用與參考之框架/模組/原始碼](#---------------)
  * [前端](#--)
  * [後端](#--)
  * [參考程式碼](#-----)
- [心得](#--)
- [組員貢獻](#----)
- [課程建議](#----)

## Demo 連結


## 安裝/使用/操作方式
* **Download**
```gherkin=
git clone https://github.com/harry1003/OnlineShop.git
```
* **Install**
```gherkin=
cd server && npm install
cd client && npm install
```
* **Run**
```gherkin=
cd server && npm start
cd client && npm start
```
* **Our client uses port 3000, and server uses port 3001. Please make sure these ports are available.**

## 系統說明
本服務分成三個等級，分別是 <未登錄> <一般登錄> <管理者> 三種帳戶

### 未登錄
未登錄用戶僅能瀏覽目前有在販售的商品，如下圖所示
![](https://github.com/harry1003/OnlineShop/blob/master/pic/anonymous.jpg)

### 一般登錄用戶
未登錄用戶可由右上角 **sign in** 按鈕來進行登錄或註冊。
登錄後可以使用 **Purchase** 與 **Profile** 功能。 
- **Purchase** 頁面能確認購買商品與調整購買數量。
![](https://github.com/harry1003/OnlineShop/blob/master/pic/Purchase.jpg)
- **Profile** 能看到用戶資訊及購買歷史
![](https://github.com/harry1003/OnlineShop/blob/master/pic/Profile.jpg)


### 管理者
管理者登錄後可以 **添加商品** **刪除商品**
- **添加商品** 透過點擊首頁新出現的 **AddProduct** 按鈕，填寫完商品訊息即可添加商品
![](https://github.com/harry1003/OnlineShop/blob/master/pic/addProduct.jpg)
- **刪除商品** 透過點擊首頁新出現的 **DeleteProduct** 按鈕，填寫要刪除的商品名字即可刪除商品
![](https://github.com/harry1003/OnlineShop/blob/master/pic/deleteProduct.jpg)


## 提供的功能
- 篩選商品 : 透過選擇網頁左側的種類來篩選想要的商品
- 上傳本地圖片 : 添加商品時支持上傳本地圖片並預覽
- 購物提醒 : 當購物列表中有商品時 **Purchase** 按鈕上會出現亮點提醒
- 密碼加密 : 儲存在資料庫的密碼是加密過後的

## 使用與參考之框架/模組/原始碼
### 前端
- **React**
    - 提供基本的前端架構
- **Reactstrap**, **Bootstrap**
    - 提供部份 css 樣式
- **Axios**
    - 負責與後端溝通
- **Jsonwebtoken**
    - 負責帳戶驗證
### 後端
- **Babel**
    - 轉換Javascript
- **Nodemon**
    - 監測 server 的程式碼
- **Express** **Cors**
    - 負責與前端溝通
- **Bodyparser**
    - 處理前端送過來的資訊
- **Mongoose**
    - 與資料庫(mongodbe)溝通
- **Bcrypt**
    - 密碼加密
- **Jsonwebtoken**
    - 負責帳戶驗證

### 參考程式碼
- 上傳圖片, 儲存圖片
    - https://codesandbox.io/s/9lzmzykjkr
    - https://stackoverflow.com/questions/43628400/meteor-react-render-image-from-array-buffer
    - https://stackoverflow.com/questions/49123222/converting-array-buffer-to-string-maximum-call-stack-size-exceeded

## 心得

## 組員貢獻

## 課程建議

###### tags: `shopping sites` `React` `node`
