<template>
  <div id="app">
    <div id="top">
      <div id="card">
        <div id="name">
          <h2 style="margin: 0;">Hi, {{ account.username }}!</h2>
        </div>
        <div style="padding: 15px;">
          <p style="margin: 0; font-size: 30px;">Total balance:</p>
          <h1 style="margin: 0;">{{ formatmoney(account.balance) }}</h1>
        </div>
      </div>
    </div>
    <div id="bottom">    
      <div id="bottom_sel">
        <div id="a">
          <button @click="this.SendMenuActive = true" class="thing" ><img src="../assets/greenarrow.png" alt="icon" width="64"><p style="color: #565656; font-size: 15px; font-weight: bold; margin: 10px">Send</p></button>
          <button @click="cheat" class="thing"><img src="../assets/greenarrow.png" alt="icon" width="64" style="transform: scaleY(-1);"><p style="color: #565656; font-size: 15px; font-weight: bold;margin: 10px">Borrow</p></button>
          <button @click="logout" class="thing"><img src="../assets/greendoor.png" alt="icon" width="64"><p style="color: #565656;font-size: 15px; font-weight: bold;margin: 10px">Log out</p></button>
        </div>
        <div id="a">
          <div class="thing" style="width: 100%; justify-content: center; align-items: center; display: flex;">T.B.A</div>
        </div>
        <div id="a">
          <button class="thing" @click="this.SaveMenuActive = true" style="padding: 0; gap: 10px; display: flex; flex-direction: column;">              
            <div id="goal_text">
              <div style="display: flex;flex-direction: column;">
                <p style="margin: 0; font-size: large; font-weight: bold; color: #565656;">Saving</p>
              </div>
              <img src="../assets/Icons8-Ios7-Logos-Xlarge-Icons.512.png" alt="icon" width="32">
            </div>
            <h1 style="padding: 10px; margin: 0;color: white; text-align: left;">{{ formatmoney(account.saving) }}</h1>
          </button>
          <div class="thing" id="goal">
            <div id="goal_text">
              <div style="display: flex;flex-direction: column;">
                <p style="margin: 0; font-size: large; font-weight: bold; color: #565656;">Spend</p>
              </div>
              <img src="../assets/Icons8-Ios7-Logos-Xlarge-Icons.512.png" alt="icon" width="32">
            </div>
            <h1 style="padding: 15px; margin: 0; ">{{ formatmoney(account.limit) }}</h1>
          </div>
        </div>
      </div>
      <div id="bottom_sel">
        <div id="table">
          <div id="tableheader">It's just a demo (Tu byłaby historia transakcji)</div>
          <div id="tablepad">
            <table>
              <th>Asset</th><th></th><th>Date</th><th>Type</th><th>ID</th><th>Status</th><th>Price</th>
              <tr v-for="(expen, index) in account.history" :key="index"><td><img src='../assets/Icons8-Ios7-Logos-Xlarge-Icons.512.png' alt="img" width="48" height="48"</td><td>{{ expen.name }}</td><td>{{ expen.date }}</td><td>{{ expen.type }}</td><td>{{ expen.id }}</td><td>{{ expen.completed }}</td><td>{{ formatmoney(expen.value) }}</td></tr>
            </table>
            <!-- <button type="submit" @click="addItem()" >Dodaj</button>   TEST BUTTON    -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--                                 -->
  <div id="SendMenu" v-if="SendMenuActive" class="popupOn Menu">
    <form @submit.prevent="balanceUpdate">
      <input type="text" v-model="transactionrecever" required placeholder="Recever">
      <input type="number" v-model="transactionprice" required placeholder="Price" max=account.balance/>
      <button type="submit" class="fancy">Send</button>
    </form>
    <button id="exitbtn" type="submit" @click="this.SendMenuActive = false" >X</button>
  </div>

  <div id="SaveMenu" v-if="SaveMenuActive" class="popupOn Menu">
    <form @submit.prevent="savingUpdate" >
      <input type="number" v-model="transactionprice" required placeholder="Price"/>
      <select v-model="transactiontype" id="transactiontype" required>
        <option value="deposit">deposit</option>
        <option value="withdraw">withdraw</option>
      </select>
      <button type="submit" class="fancy">Send</button>
    </form>
    <button id="exitbtn" type="submit" @click="this.SaveMenuActive = false" >X</button>
  </div>

</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      account: null,
      username: null,
      transactiontype: null,
      transactionrecever: null,
      transactionprice: null,
      SendMenuActive: false,
      SaveMenuActive: false,
      list: [],
    };
  },
  async created() {
    try {
        this.username = localStorage.getItem("username");
        const response = await axios.get(`/users/${this.username}/user`);
        this.account = response.data.user;
        //console.log(response)
      } catch (err) {
        console.error(err);
      }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = ``;
      this.$router.push('/login');
    },
    async balanceCheck() {
      try {
        const response = await axios.get(`/users/${this.username}/balance`);
        this.account = response.data.user;
        //console.log(response)
      } catch (err) {
        console.error(err);
      }
    },
    async balanceUpdate() {
      try {
        const response = await axios.put(`/users/${this.username}/balance`, {
          amount: this.transactionprice,
          type: "withdraw",
          recever: this.transactionrecever
        });
        if (this.transactionrecever == this.username) {
          console.error(error);
        }
        this.account = response.data;
        //this.addItem("img_selected",this.transactionrecever,this.transactiontype,this.transactionprice);
        this.SendMenuActive = false;
      } catch (error) {
        console.error(error);
        this.SendMenuActive = false;
        alert('Failed to update balance.');
      }
    },
    async savingUpdate() {
      try {
        const response = await axios.put(`/users/${this.username}/saving`, {
          amount: this.transactionprice,
          type: this.transactiontype,
        });
        if (this.transactionrecever == this.username) {
          console.error(error);
        }
        this.account = response.data;
        //this.addItem("img_selected",this.transactionrecever,this.transactiontype,this.transactionprice);
        this.SaveMenuActive = false;
      } catch (error) {
        console.error(error);
        this.SaveMenuActive = false;
        alert('Failed to update savings.');
      }
    },
    async cheat() {
      try {
        const response = await axios.put(`/users/${this.username}/balance`, {
          amount: 300,
          type: "deposit",
          recever: this.username
        });
        this.account = response.data;
      } catch (error) {
        console.error(error);
        alert('Failed to update balance.');
      }
    },
    addItem(img_selected,name,type,value) {
      //if (this.userInput.trim() !== '') {)
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = String(date.getDate()).padStart(2, '0');
        const newItem = {
          img_selected: img_selected,
          id: Math.round(Math.random()*10000),
          name: name,
          date: `${year}-${month}-${day}`,
          type: type,
          completed: true,
          value: value,
        };
        this.list.push(newItem);
        console.log(newItem);
        if (this.list.length >= 5) {
          var theRemovedElement = this.list.shift();
        }
    },
    formatmoney(price){
        let USDollar = new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency: 'PLN',
      });
      return USDollar.format(price)
    },
  },
};
</script>