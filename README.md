# social-media

social media application

# Front-End

# Back-End

# Over View of the system design

## Business Requirements:

- ### Image Upload:
	Users should be able to upload image from their devices. The system should support different image format and sizes.
- ### Like and Comment:
	Users should be able to like and comment on images. View the likes and comments on images. Receive notifications when their images are liked or commented.
- ### Follow:
	Users should be able to follow ather user and get notification when others follow them.
- ### News Feed:
	System should generate a news feed of images the news feed should be sorted on relevancy and freshness.
- ### Messaging:     
	Users should be able to send direct msgs to other user, and get notifications when they receive msgs from other users.
	
## Technical Requirements:
    
-  The system should support image formats such as JPEG, PNG, and GIF.
- The maximum allowed image size should be 10MB.
- The system should be able to handle at least 100.000 concurrent uploads.
- Upload maximum 10 images / day.
- Handle a least 1 million concurrent likes and comments.
- Handle at least 1 billion registered users.
- Users should be able to follow at least 1.000 other users.

## Database Schema:


![DatabaseSchema](https://github.com/chagna-yassine/social-media/assets/109078003/1d5bad97-b2eb-4820-bbcc-e57117c2b54a)


## Queries Exemples:
- ### Numbers of likes for a post:
	`SELECT COUNT(*) FROM Like WHERE post_id = [post_id];`
- ### Get all thhe posts for a specific user:
	`SELECT * FROM Post WHERE user_id = [user_id];`
- ### Get all the follower for a specific user:
	`SELECT * FROM Follow WHERE following_user_id = [user_id];`
	
## Architecture Over View:


![Architecture](https://github.com/chagna-yassine/social-media/assets/109078003/dcc52716-a8ed-46ea-804c-f651bc5f6c57)


- ### API Gateway: 
	check some security information if needed (identification..).
      
- ### API:
	 Handle the user queries and return respond.

- ### Micro services: 
	handle all the back-end and have a direct link to database and cash.

- ### Message Q:
	to provide the system from crashing handle the access of the database.

- ### Blob store: 
	where images are stored. (NOTE: the database only have the image url).

## API Wndpoints:

- > ### POST `/image/upload`  - to upload an image.
- > ### GET `/image/{image_id}` - to retrieve a specific image.
- > ### POST `/user/{user_id}/follow` - to follow another user.
- > ### POST `/image/{image_id}/like` - to like a specific image.
- > ### POST `/image/{image_id}/comment` - to add comment to a specific image.
- > ### GET `/feed` - to retrieve a user's news feed.


## Micro services Over View:



![microservices](https://github.com/chagna-yassine/social-media/assets/109078003/76f9e61f-0267-429c-8798-7b03c8087b43)



- ### Image service: 
	connect with the database to handle add and remove of images.
      
- ### Feed service: 
	generate feed based on the following and likes.
      
- ### Fanout service: 
	handle distributing events to corresponding services (if post is posted the fanout send notifications to the follower about the new post).
      
- ### Like service: 
	handle the add, remove and the count of likes have a connection with the database.
      
- ### Comment service: 
	handle the add, remove and the count of comments have a connection with the database.
      
- ### Metadata: 
	handle the access of the database, the cash and make sure every component get updated database.
      
- ### Message Q: 
	store all the queries in a Q and execute them one by one or by priority. 
	
	
	
* * *
# Use case exemple:


![API](https://github.com/chagna-yassine/social-media/assets/109078003/743f8e25-aa91-4e16-afe5-ce95995bcfb2)


 - ### Upload image:
	 
	◦ The user send a queries to upload an image by the ui.

	◦ the geteway api perform a security check of accessibility … .

	◦ the api send it to the image services.

	◦ the image service store the image in the blob store and generate an url and an id return to image service.

	◦ image service store the information in the database passing by the metadata service.

	◦ The image service send a queries to the fanout servicce to handle distributing the events to the follower.

	◦ The fanout get the data from the metadata and he is connected to cash.

	◦ Create notifications for each follower and send it to the message Q.

	◦ the message Q check the like and comment services and send the a queries to the feed services

	◦ the feed services get data from the metadata and process of generating new feed according to the following and like

	◦ the image service return to the user by the api that the image was uploaded successfully.
