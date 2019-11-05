souper-stuff

Angular Material
Firebase Authentication

History:
Removed ngx-auth-firebaseui again, because it creates users collection by itself and you cannot customize user fields.
Also I only use google auth provider and don't get much from ngx-auth-firebaseui.
ngx-auth-firebaseui https://www.npmjs.com/package/ngx-auth-firebaseui

Firebase

Structuring data 
Explanation: 
https://www.youtube.com/watch?v=o7d5Zeic63s
https://www.youtube.com/watch?v=haMOUb3KVSo
https://angularfirebase.com/lessons/advanced-firestore-nosql-data-structure-examples/#Advanced-Techniques-in-NoSQL

Documents:
Put data in the same documents, if you're always display the data together. Because you cannot retrieve a part of a document.

Subcollection or Toplevel Collection?

Subcollection: 
If you're grabbing a collection. You're not grabbing the subcollections yet!
store data hierarchly, if 
* mostly searching items PER subcollection  
* occasionally do a collection group query
Example:
collection("movie/filmXY/actors").where(age >= 20)
collectionGroup("actors").where(name == "Adam") // show all actors named Adam of all movies

Toplevel-Collection:
* mostly searching across all documents
* occasionally do "per book" query



Souper Stuff Data Structure:

The stuffs data structure and their relationship with users is not denormalized. I will manage stuffs as a subcollection of a userId, because I won't call querys across parents. There will be no stuff shared between all users or 
a user should not interact with lots of other users.
Just in case if any stuff will be shared between users I decided to make user groups. So in the end there are these toplevel collections (or root collections):

root-collection Users {
 name: string,
 groupId: string
}

root-collection Group {
 name: string;
 tags: SubCollection
}

root-collection Stuff { 
 groupId: string;
}

sub-collection GroupStuff {

 name: string,
 note: string,
 rating: number,
 price: number,
 priceRange: number,

 adress: {
  street: string,
  city: string,
  publicStation: string
 },

 photoes
 num_history: number,
 lastUpdated: Date,
 history: [collection]
 tags: {
  tag1: true,
  tag2: true
 }

}


Can I delete documents of a subcollection easily?
* its okay you are limited to delete a collection, but delete a document is fine.



Solution Calendar:
To display all the stuff of one month I'm gonna fetch all stuff.lastUpdated within one month

Firebase Extra:
Timestamps: https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp.html#todate