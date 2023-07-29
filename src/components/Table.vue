<template>
   <div class="user-table">
      <table>
         <thead>
            <tr>
               <th>#</th>
               <th>Name</th>
               <th>Username</th>
               <th>E-Mail</th>
            </tr>
         </thead>
         <tbody>
            <tr
               v-for="user in users"
               key="user.id"
            >
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.surName}</td>
               <td>{user.}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
import { onMounted } from 'vue';
import { fetchUserData } from '../api/apiCalls';
export default {
   name: 'Table',
};
</script>

<style>
.user-table {
   display: flex;
   justify-content: center;
   align-items: center;
}

table,
td,
th {
   border: 1px solid black;
}

th {
   font-size: 20px;
}

td {
   padding: 0.5rem 2rem;
   margin: 3px;
}
</style>
