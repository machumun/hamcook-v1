<template>
  <div class="recipes">
    <v-btn
      dark
      block
      x-large
      :color="$hColor.subPink"
      class="mt-10"
      @click="
        MiSetModalStatus({
          modalName: 'hRecipeModal',
          isShow: true
        })
      "
    >
      <v-icon dark class="mr-5">
        mdi-cloud-upload
      </v-icon>
      料理の登録
    </v-btn>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              料理名
            </th>
            <th class="text-left">
              材料
            </th>
            <th class="text-left">
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in miRecipes" :key="String(recipe)">
            <td>{{ recipe.name }}</td>
            <td>
              <div v-for="material in recipe.materials" :key="String(material)">
                <div>
                  {{
                    `${material.name} ${material.quantity}(${material.unit})`
                  }}
                </div>
              </div>
            </td>

            <td>
              <a :href="recipe.url" target="_brank">{{ recipe.url }} </a>
            </td>

            <!-- <td>
              <v-btn depressed flat fab x-small dark color="red">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </td> -->
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  created() {
    console.log("recipes", this.miRecipes);
  }
};
</script>

<style></style>
