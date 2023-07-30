<template>
   <div class="user-table">
      <table class="bordered-table">
         <colgroup>
            <col style="width: 13%" />
            <col style="width: 29%" />
            <col style="width: 29%" />
            <col style="width: 29%" />
         </colgroup>

         <thead>
            <tr>
               <th @click="sortBy('id')">
                  #
                  <i
                     :class="sortIcon('id')"
                     :style="iconStyle('id')"
                  ></i>
               </th>
               <th @click="sortBy('name')">
                  Name
                  <i
                     :class="sortIcon('name')"
                     :style="iconStyle('name')"
                  ></i>
               </th>
               <th @click="sortBy('username')">
                  Username
                  <i
                     :class="sortIcon('username')"
                     :style="iconStyle('username')"
                  ></i>
               </th>
               <th @click="sortBy('email')">
                  E-Mail
                  <i
                     :class="sortIcon('email')"
                     :style="iconStyle('email')"
                  ></i>
               </th>
            </tr>
         </thead>
         <tbody>
            <tr
               v-for="user in users"
               :key="user.id"
            >
               <td>{{ user.id }}</td>
               <td class="table-user-name">
                  <p>{{ user.name }}</p>
               </td>
               <td>{{ user.username }}</td>
               <td>{{ user.email }}</td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script>
//Api imports
import { fetchUserData } from '../api/apiCalls';
//icon imports
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
   name: 'Table',
   data() {
      return {
         users: [], // Kullanıcı verilerini içeren boş bir dizi tanımla
         sortKey: '',
         sortDirection: 1,
      };
   },
   mounted() {
      this.fetchUsersData(); // bileşen yüklendiğinde verileri çekmek için fetchUsersData fonksiyonunu çağır
   },
   methods: {
      async fetchUsersData() {
         try {
            // apiCalls.js'deki fetchUserData fonksiyonunu çağırarak verileri al
            this.users = await fetchUserData(); // fetchUserData artık parametresiz olarak çağrılıyor
            console.log(this.users);
         } catch (error) {
            console.log('Kullanıcı verilerini alma başarısız oldu:', error);
         }
      },
      sortBy(key) {
         if (this.sortKey === key) {
            this.sortDirection = this.sortDirection * -1;
         } else {
            this.sortDirection = 1;
            this.sortKey = key;
         }

         // Kullanıcıları sırala
         this.sortUsers();
      },
      sortUsers() {
         this.users.sort((a, b) => {
            const key = this.sortKey;
            const direction = this.sortDirection;

            // Örnek olarak, id'ye göre sıralama yapalım
            if (a[key] > b[key]) return direction;
            if (a[key] < b[key]) return -direction;
            return 0;
         });
      },
      sortIcon(key) {
         if (this.sortKey === key) {
            return this.sortDirection && 'fas fa-chevron-down';
         }
         return; // Sıralama yapılmıyorsa boş bir sınıf döndürür
      },

      iconStyle(key) {
         if (this.sortKey === key) {
            return { transform: `rotate(${this.sortDirection === 1 ? 0 : 180}deg)` };
         }
         return {};
      },
   },
};
</script>

<style>
.user-table {
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 0 1rem;
}

table.bordered-table {
   box-shadow: 4px 8px 12px rgba(28, 6, 49, 0.4);
   border-collapse: collapse; /* Hücre içi çizgileri birleştir */
   border-radius: 2rem;
   border: 1px solid black; /* Hücre içi çizgiler */
   overflow: hidden;
   width: 100%;
   text-align: left;
   table-layout: fixed;
}

table.bordered-table th {
   font-size: 20px;
}

table.bordered-table th,
table.bordered-table td {
   padding: 0.5rem 2rem;
   border: 1px solid black;
   margin: 3px;
}

table.bordered-table th {
   cursor: pointer;
}
th i {
   transition: transform 0.3s ease-in-out; /* 0.2 saniyelik geçiş süresi, ease-in-out hız eğrisi */
}

/* İkonları döndürmek için gerekli stiller */
.rotate-up {
   transform: rotate(180deg); /* Yukarı dönme */
}

.rotate-down {
   transform: rotate(0deg); /* Aşağı dönme */
}

.table-user-name p {
   font-weight: bold;
   cursor: pointer;
   color: rgb(86, 81, 81);
   border-bottom: 2px solid rgba(255, 255, 255, 0);
   display: inline;
   transition: all 0.2s ease-in-out;
}

.table-user-name p:hover {
   border-bottom: 2px solid black;
}
</style>
