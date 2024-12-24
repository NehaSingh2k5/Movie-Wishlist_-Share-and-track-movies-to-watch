// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedBlog {
    struct BlogPost {
        string title;
        string content;
        address author;
        uint256 timestamp;
        bool isActive;
    }
    
    mapping(uint256 => BlogPost) public posts;
    uint256 public postCount;
    
    event PostCreated(uint256 indexed postId, string title, address author);
    event PostUpdated(uint256 indexed postId, string newTitle, string newContent);
    
    // Function 1: Create a new blog post
    function createPost(string memory _title, string memory _content) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        postCount++;
        
        posts[postCount] = BlogPost({
            title: _title,
            content: _content,
            author: msg.sender,
            timestamp: block.timestamp,
            isActive: true
        });
        
        emit PostCreated(postCount, _title, msg.sender);
    }
    
    // Function 2: Update an existing blog post
    function updatePost(uint256 _postId, string memory _newTitle, string memory _newContent) public {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        require(posts[_postId].author == msg.sender, "Only the author can update the post");
        require(posts[_postId].isActive, "Post is not active");
        require(bytes(_newTitle).length > 0, "New title cannot be empty");
        require(bytes(_newContent).length > 0, "New content cannot be empty");
        
        BlogPost storage post = posts[_postId];
        post.title = _newTitle;
        post.content = _newContent;
        
        emit PostUpdated(_postId, _newTitle, _newContent);
    }
}