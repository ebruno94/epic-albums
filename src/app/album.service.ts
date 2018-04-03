import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { ALBUMS } from './mock-albums';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
  }

  getAlbums(){
    return this.albums;
  }

  addAlbum(newAlbum: Album){
    this.albums.push(newAlbum);
  }

  getAlbumById(albumId: number){
    return this.database.object('/albums/' + albumId);
  }

  updateAlbum(localUpdatedAlbum){
    var albumEntry = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntry.update({title: localUpdatedAlbum.title, artist: localUpdatedAlbum.artist, description: localUpdatedAlbum.description});
  }

  deleteAlbum(localAlbum){
    var albumEntry = this.getAlbumById(localAlbum.$key);
    albumEntry.remove();
  }

}
