**Introducing Fire Camp: Your Digital Haven for Free Expression**

Are you ready to join a thriving digital community where free speech and creativity reign supreme? Welcome to Fire Camp, the ultimate social media platform where your voice matters, and your creativity knows no bounds.

![Screenshot from 2023-09-02 18-16-04](https://github.com/chagna-yassine/social-media/assets/109078003/302b9516-7dab-4389-87cc-6404a169024e)


**What is Fire Camp?**

Fire Camp is your passport to a vibrant online world where you can freely express yourself, connect with kindred spirits, and share your thoughts, art, and ideas with a diverse and welcoming community.

**What Makes Fire Camp Unique?**

- **Visual Expression:** Show the world your unique perspective with our intuitive image upload feature. Whether it's breathtaking photography, captivating artwork, or a simple snapshot of your day, Fire Camp supports a variety of image formats and sizes to help you shine.

- **Engagement:** Connect with like-minded individuals through likes and comments. Feel the pulse of the community with real-time notifications, ensuring you never miss a beat.

- **Community Building:** Grow your network by following others who inspire you. Receive notifications when fellow Fire Campers join your journey, fostering a sense of camaraderie.

- **Fresh Content:** Our intelligent system curates a personalized news feed, delivering the freshest and most relevant content right to your fingertips. Stay inspired by the latest contributions from your connections and the wider Fire Camp family.

- **Private Conversations:** Forge deeper connections with direct messaging. Reach out to fellow Fire Campers and be instantly alerted when you receive new messages.

Fire Camp is where your voice matters, your creativity thrives, and your freedom of expression knows no limits. Join us today and be part of a community that celebrates individuality and encourages you to unleash your inner fire.

# Over View of the system design

## Database Schema:


![DatabaseSchema](https://github.com/chagna-yassine/social-media/assets/109078003/1d5bad97-b2eb-4820-bbcc-e57117c2b54a)
	
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


## Micro services Over View:

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
