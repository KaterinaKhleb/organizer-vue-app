import axios from 'axios';
const resource_uri = 'http://localhost:5000/notes'
const create_uri = 'http://localhost:5000/create'
const delete_uri = 'http://localhost:5000/delete'
const update_uri = 'http://localhost:5000/update'
const resource_uri_todos = 'http://localhost:5000/todos'
const create_uri_todos = 'http://localhost:5000/createtodo'
const delete_uri_todos = 'http://localhost:5000/deletetodo'
const update_uri_todos = 'http://localhost:5000/updatetodo'
const pin_uri_todos = 'http://localhost:5000/pintodo'
const resource_uri_shops = 'http://localhost:5000/shop'
const create_uri_shop = 'http://localhost:5000/createshop'
const update_uri_shop = 'http://localhost:5000/updateshop'
const pin_uri_shop = 'http://localhost:5000/pinshop'
const delete_uri_shop = 'http://localhost:5000/deleteshop'




const state = {

    notes: [],
    todos: [],
    shop: []

};

const getters = {
    allNotes: (state) => state.notes,
    allTodos: (state) => state.todos,
    allShops: (state) => state.shop
}

const actions = {
    async fetchNotes({ commit }) {
        const response = await axios.get(resource_uri)
        commit('setNotes', response.data)
    },
    async addNote({ commit }, note) {
        const response = await axios.post(create_uri, note);
        commit('newNote', response.data.note);
    },
    async removeNote({ commit }, note) {
        await axios.delete(delete_uri, { data: note });
        commit('deleteNote', note)
    },
    async editNote({ commit }, note) {
        await axios.put(update_uri, { data: note });
        commit('updateNote', note)
    },


    async fetchTodos({ commit }) {
        const response = await axios.get(resource_uri_todos)
        commit('setTodos', response.data)
    },
    async addTodo({ commit }, todo) {
        const response = await axios.post(create_uri_todos, todo);
        commit('newTodo', response.data.todo);
    },
    async removeTodo({ commit }, todo) {
        await axios.delete(delete_uri_todos, { data: todo });
        commit('deleteTodo', todo)
    },
    async checkTodo({ commit }, todo) {
        await axios.put(update_uri_todos, { data: todo });
        commit('updateTodo', todo)
    },
    async pinTodo({ commit }, todo) {
        await axios.put(pin_uri_todos, { data: todo });
        commit('updateTodo', todo)
    },

    async fetchShops({ commit }) {
        const response = await axios.get(resource_uri_shops)
        commit('setShops', response.data)
    },

    async addShopList({ commit }, list) {
        const response = await axios.post(create_uri_shop, list);
        commit('newShopList', response.data.shop);
    },
    async updateShopList({ commit }, list) {
        await axios.put(update_uri_shop, { data: list });
        commit('updateShop', list)
    },
    async pinShopList({ commit }, list) {
        await axios.put(pin_uri_shop, { data: list });
        commit('updateShop', list)
    },
    async removeShopList({ commit }, list) {
        await axios.delete(delete_uri_shop, { data: list });
        commit('deleteShopList', list)
    },



};

const mutations = {
    setNotes: (state, notes) => state.notes = notes,
    newNote: (state, note) => state.notes.push(note),
    deleteNote: (state, note) => {
        let index = state.notes.findIndex(n => n._id == note._id)
        state.notes.splice(index, 1)
    },
    updateNote: (state, note) => {
        state.notes.findIndex(n => n._id == note._id)
    },

    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.push(todo),
    deleteTodo: (state, todo) => {
        let index = state.todos.findIndex(t => t._id == todo._id)
        state.todos.splice(index, 1)
    },
    updateTodo: (state, todo) => {
        state.todos.findIndex(t => t._id == todo._id)
    },


    setShops: (state, shop) => state.shop = shop,

    newShopList: (state, list) => state.shop.push(list),
    updateShop: (state, list) => {
        state.shop.findIndex(t => t._id == list._id)
    },
    deleteShopList: (state, list) => {
        let index = state.shop.findIndex(s => s._id == list._id)
        state.shop.splice(index, 1)
    },


}

export default {
    state,
    getters,
    actions,
    mutations
};