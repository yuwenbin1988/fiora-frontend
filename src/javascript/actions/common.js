'use strict'

module.exports = {
    types: {
        SetToken: 'SetToken',
        SetUser: 'SetUser',
        SetUserInfo: 'SetUserInfo',
        AddLinkman: 'AddLinkman',
        SetCurrentLinkman: 'SetCurrentLinkman',
        SetLoginStatus: 'SetLoginStatus',
        AddGroupMessage: 'AddGroupMessage',
        AddUserMessage: 'AddUserMessage',
        SetWindowVisible: 'SetWindowVisible',
        SetComments: 'SetComments',
        ToggleNotification: 'ToggleNotification',
    },
    
    login: function (dispatch, username, password, io) {
        return new Promise( resolve => {
            io.socket.post('/auth', {username, password, token: io.sails.token}, (result, jwr) => {
                dispatch({ type: this.types.SetLoginStatus, status: jwr.statusCode === 201 });
                resolve({ status: jwr.statusCode, data: result });
            });
        } );
    },
    
    logout: function (dispatch, io) {
        return new Promise( resolve => {
            io.socket.delete('/auth', {token: io.sails.token}, (result, jwr) => {
                dispatch({ type: this.types.SetLoginStatus, status: false });
                dispatch({ type: this.types.SetUser, user: undefined });
                resolve({ status: jwr.statusCode, data: result });
            });
        } );
    },
    
    setToken: function (token) {
        return {
            type: this.types.SetToken,
            token: token
        };
    },
    
    setUser: function (user) {
        return {
            type: this.types.SetUser,
            user: user
        };
    },
    
    setUserInfo: function (user) {
        return {
            type: this.types.SetUserInfo,
            user: user
        };
    },
    
    addLinkman: function (user) {
        return {
            type: this.types.AddLinkman,
            user: user
        };
    },
    
    setCurrentLinkman: function (user, isGroup) {
        return {
            type: this.types.SetCurrentLinkman,
            user: user,
            isGroup: isGroup
        };
    },
    
    setLoginStatus: function (status) {
        return {
            type: this.types.SetLoginStatus,
            status: status
        };
    },
    
    addGroupMessage: function (group, message) {
        return {
            type: this.types.AddGroupMessage,
            group: group,
            message: message
        };
    },
    
    addUserMessage: function (user, message) {
        return {
            type: this.types.AddUserMessage,
            user: user, 
            message: message
        };
    },
    
    setWindowVisible: function (status) {
        return {
            type: this.types.SetWindowVisible,
            status: status
        };
    },
    
    setComments: function (comments) {
        return {
            type: this.types.SetComments,
            comments: comments
        };
    },
    
    toggleNotification: function () {
        return {
            type: this.types.ToggleNotification
        };
    }
};