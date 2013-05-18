// Generated by CoffeeScript 1.6.2
var Dungeon, Room;

Dungeon = (function() {
  var BLANK_TILE, FLOOR_TILE, WALL_TILE;

  BLANK_TILE = 0;

  FLOOR_TILE = 1;

  WALL_TILE = 2;

  function Dungeon(map_width, map_height, max_features, room_chance) {
    var x, y;

    this.map_width = map_width;
    this.map_height = map_height;
    this.max_features = max_features;
    this.room_chance = room_chance;
    this.tiles = [];
    this.fill_map();
    x = Math.floor(this.map_width / 2);
    y = Math.floor(this.map_height / 2);
    this.make_room(x, y, 5, 5);
  }

  Dungeon.prototype.fill_map = function() {
    var row, x, y, _i, _j, _ref, _ref1, _results;

    _results = [];
    for (y = _i = 1, _ref = this.map_height; 1 <= _ref ? _i <= _ref : _i >= _ref; y = 1 <= _ref ? ++_i : --_i) {
      row = [];
      for (x = _j = 1, _ref1 = this.map_width; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 1 <= _ref1 ? ++_j : --_j) {
        row.push(BLANK_TILE);
      }
      _results.push(this.tiles.push(row));
    }
    return _results;
  };

  Dungeon.prototype.make_room = function(x, y, width, height) {
    var room;

    room = new Room(x, y, width, height, Math.floor((Math.random() * 1) + 1), this);
    return room.build();
  };

  Dungeon.prototype.get_tile = function(x, y) {
    return this.tiles[y][x];
  };

  Dungeon.prototype.set_tile = function(x, y, tile) {
    return this.tiles[y][x] = tile;
  };

  Dungeon.prototype.is_blank_tile = function(x, y) {
    return this.get_tile(x, y) === BLANK_TILE;
  };

  Dungeon.prototype.set_wall_tile = function(x, y) {
    return this.set_tile(x, y, WALL_TILE);
  };

  Dungeon.prototype.set_floor_tile = function(x, y) {
    return this.set_tile(x, y, FLOOR_TILE);
  };

  return Dungeon;

})();

Room = (function() {
  function Room(x, y, width, height, direction, dungeon) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.dungeon = dungeon;
    this.xlen = Math.floor((Math.random() * this.width) + 4);
    this.ylen = Math.floor((Math.random() * this.height) + 4);
    this.dir = 0;
    if (this.direction > 0 && this.direction < 4) {
      this.dir = this.direction;
    }
  }

  Room.prototype.build = function() {
    if (this.dir === 0 && this.has_enough_space_north()) {
      return this.build_north();
    } else if (this.dir === 1 && this.has_enough_space_east()) {
      return this.build_east();
    } else if (this.dir === 2 && this.has_enough_space_south()) {
      return this.build_south();
    } else if (this.dir === 3 && this.has_enough_space_west()) {
      return this.build_west();
    } else {
      return false;
    }
  };

  Room.prototype.has_enough_space_north = function() {
    var xtemp, ytemp;

    ytemp = this.y;
    while (ytemp > (this.y - this.ylen)) {
      if (ytemp < 0 || ytemp > this.dungeon.map_height) {
        return false;
      }
      xtemp = this.x - Math.floor(this.xlen / 2);
      while (xtemp < (this.x + Math.floor((this.xlen + 1) / 2))) {
        if (xtemp < 0 || xtemp > this.dungeon.map_width) {
          return false;
        }
        if (!this.dungeon.is_blank_tile(xtemp, ytemp)) {
          return false;
        }
        xtemp += 1;
      }
      ytemp -= 1;
    }
    return true;
  };

  Room.prototype.build_north = function() {
    var xtemp, ytemp, _results;

    ytemp = this.y;
    _results = [];
    while (ytemp > (this.y - this.ylen)) {
      xtemp = this.x - Math.floor(this.xlen / 2);
      while (xtemp < (this.x + Math.floor((this.xlen + 1) / 2))) {
        if (xtemp === (this.x - Math.floor(this.xlen / 2))) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (xtemp === (this.x + Math.floor((this.xlen - 1) / 2))) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (ytemp === this.y) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (ytemp === (this.y - this.ylen + 1)) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else {
          this.dungeon.set_floor_tile(xtemp, ytemp);
        }
        xtemp += 1;
      }
      _results.push(ytemp -= 1);
    }
    return _results;
  };

  Room.prototype.has_enough_space_east = function() {
    var xtemp, ytemp;

    ytemp = this.y - Math.floor(this.ylen / 2);
    while (ytemp < (this.y + Math.floor((this.ylen + 1) / 2))) {
      if (ytemp < 0 || ytemp > this.dungeon.map_height) {
        return false;
      }
      xtemp = this.x;
      while (xtemp < this.x + this.xlen) {
        if (xtemp < 0 || xtemp > this.dungeon.map_width) {
          return false;
        }
        if (!this.dungeon.is_blank_tile(xtemp, ytemp)) {
          return false;
        }
        xtemp += 1;
      }
      ytemp += 1;
    }
    return true;
  };

  Room.prototype.build_east = function() {
    var xtemp, ytemp, _results;

    ytemp = this.y - Math.floor(this.ylen / 2);
    _results = [];
    while (ytemp < (this.y + Math.floor((this.ylen + 1) / 2))) {
      xtemp = this.x;
      while (xtemp < this.x + this.xlen) {
        if (xtemp === this.x) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (xtemp === this.x + this.xlen - 1) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (ytemp === this.y - Math.floor(this.ylen / 2)) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else if (ytemp === this.y + Math.floor((this.ylen - 1) / 2)) {
          this.dungeon.set_wall_tile(xtemp, ytemp);
        } else {
          this.dungeon.set_floor_tile(xtemp, ytemp);
        }
        xtemp += 1;
      }
      _results.push(ytemp += 1);
    }
    return _results;
  };

  Room.prototype.has_enough_space_south = function() {
    var xtemp, ytemp;

    ytemp = this.y;
    while (ytemp < this.y + this.ylen) {
      if (ytemp < 0 || ytemp > this.dungeon.map_height) {
        return false;
      }
      xtemp = this.x - Math.floor(this.xlen / 2);
      while (xtemp < this.x + Math.floor((this.xlen + 1) / 2)) {
        if (xtemp < 0 || xtemp > this.dungeon.map_width) {
          return false;
        }
        if (!this.dungeon.is_blank_tile(xtemp, ytemp)) {
          return false;
        }
        xtemp += 1;
      }
      ytemp += 1;
    }
    return true;
  };

  Room.prototype.has_enough_space_west = function() {
    var xtemp, ytemp;

    ytemp = this.y - Math.floor(this.ylen / 2);
    while (ytemp < this.y + Math.floor((this.ylen + 1) / 2)) {
      if (ytemp < 0 || ytemp > this.dungeon.map_height) {
        return false;
      }
      xtemp = this.x;
      while (xtemp > this.x - this.xlen) {
        if (xtemp < 0 || xtemp > this.dungeon.map_width) {
          return false;
        }
        if (!this.dungeon.is_blank_tile(xtemp, ytemp)) {
          return false;
        }
        xtemp -= 1;
      }
      ytemp += 1;
    }
    return true;
  };

  return Room;

})();