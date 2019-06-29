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
https://www.youtube.com/watch?v=wTJpnOcWHjU

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
- **Express** **Cors**
    - 負責與前端溝通
- **Bodyparser**, **Multer**
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
    - https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef

- 登入系統
    - https://github.com/rchvalbo/jwt_react_node_starting_template_complete

- 表單css
    - https://github.com/alligatorio/Fancy-Form-Example

## 心得
- 張皓雲: 這次的作業很大一部份都是延續我的期中作業，不過因為期中的時候對後端其實還不太熟悉，所以寫法極為混亂，該分開的部份也沒有分開，所以後來後端基本上重寫了一遍，前端接口的地方也統一整理。為了處理 Network Error, db error 之類的情況，也對 Promise, async 更加理解。實做上傳圖片的時候一開始後端什麼也沒收到，後來才發現是 Bodyparser 沒辦法接，要用別的套件。
- 林耘寬： 這次的作業我實作了帳號系統，這是我期中作業就想寫的部分，在這之前，我有稍微做過session 及cookie 的做法，所以這次使用了許多人推薦的 jsonwebtoken來做驗證的部分。最大的感想就是即使寫了一學期的網站，每次作業當中還是可以意識到自己的不足，只能說經過這學期的課程，只是個開始而已。

## 組員貢獻
### 張皓雲
- 前端＆後端的基本架構
- 前後端串接
- 前端 css
- 購買、新增、刪除商品

### 林耘寬
- 登錄、註冊、帳號管理
- 帳號歷史資訊

## 課程建議
- 前後端練習數量似乎差有點多。


###### tags: `shopping sites` `React` `node`
