
# img-proccesser
to test the project: npm run test

to build the project: npm run build

to start the project: npm start
-------------------------------------------

links in for the project:
-http://localhost:3000/api
will show 'hello world;

-http://localhost:3000/api/image
will show misiing inputs

-http://localhost:3000/api/image?image=test.jpg&width=300&height=150
will show the picture

-------------------------------------------
# Changes

-added services file under src for logic and moved the img proccessing functionality there
-adjusted package.json according to the reviewer comments
-fixed the problem with the image endpoint and added extra input validation
image.png

-added test for imgProccess function
-added appropiate typing for parameters and returns
-add .eslintigonre to igonre *dist* file