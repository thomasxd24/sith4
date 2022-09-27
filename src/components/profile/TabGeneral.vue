<template>
  <div class="tab-content">
  <div class="row">
    <div class="col">
      <h3>{{ $t('profile.general.informations.title') }}</h3>
      <ul class="informations">
        <li>
          <span class="info-name">{{ $t('profile.general.informations.birth_date') }}</span>
          <span class="info-value">{{ user.birthDate.toLocaleDateString() }}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.informations.pronouns') }}</span>
          <span class="info-value">{{ user.pronouns ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.informations.gender') }}</span>
          <span class="info-value">{{ user.gender ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.informations.department') }}</span>
          <span class="info-value">{{ user.department ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.informations.promotion') }}</span>
          <span class="info-value">{{ user.promotion ?? '.'}}</span>
        </li>
      </ul>
    </div>
    <div class="col">
      <h3>{{ $t('profile.general.contact.title') }}</h3>
      <ul class="informations">
        <li>
          <span class="info-name">{{ $t('profile.general.contact.email') }}</span>
          <span class="info-value">{{ user.email }}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.contact.phone') }}</span>
          <span class="info-value">{{ user.phoneNumber ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.contact.address') }}</span>
          <span class="info-value">{{ user.studentAddress ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.contact.parent_address') }}</span>
          <span class="info-value">{{ user.parentAddress ?? '.'}}</span>
        </li>
        <li>
          <span class="info-name">{{ $t('profile.general.contact.emergency_contact') }}</span>
          <span class="info-value">{{ user.emergencyPhoneNumber ?? '.'}}</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="row clubs-and-activities">
    <div class="col">
      <h3>{{ $t('profile.general.clubs') }}</h3>
      <div class="row clubs">
        <div class="col semester-tab-container">
          <v-btn @click="switchClubTab('up', clubTab)" color="transparent" :disabled="clubTab === 0" class="semester-tab-btn"
            flat size="28" icon="mdi-chevron-up" />
          <div class="semester-tab">
            {{ fullMonth(Object.keys(user.clubs)[clubTab]) }}
          </div>
          <v-btn @click="switchClubTab('down', clubTab)" color="transparent"
            :disabled="clubTab === Object.keys(user.clubs).length - 1" class="semester-tab-btn" flat size="28"
            icon="mdi-chevron-down" />
        </div>
        <div class="col">TEST</div>
      </div>
    </div>
    <div class="col">
      <h3>{{ $t('profile.general.activities') }}</h3>
      <div class="row activities">
        <div class="col semester-tab-container">
          <v-btn @click="switchClubTab('up', activityTab)" color="transparent" :disabled="activityTab === 0"
            class="semester-tab-btn" flat size="28" icon="mdi-chevron-up" />
          <div class="semester-tab">
            {{ fullMonth(Object.keys(user.activities)[activityTab]) }}
          </div>
          <v-btn @click="switchClubTab('down', activityTab)" color="transparent"
            :disabled="activityTab === Object.keys(user.activities).length - 1" class="semester-tab-btn" flat size="28"
            icon="mdi-chevron-down" />
        </div>
        <div class="col">TEST</div>
      </div>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-content {
  padding: 20px 30px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 600px) {
    padding: 20px 0;
  }
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;

  > * {
    flex: 1;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 10px;

  > * {
    flex: 1;
  }
}

.informations {
  padding: 7px 0 0 20px;
  font-size: 16px;
  list-style: none;

  > li {
    display: flex;
    justify-content: space-between;

    > span {
      &:first-child {
        width: 100%;
        max-width: 30%;
      }

      &:last-child {
        width: 100%;
        max-width: 60%;
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 3px;

      > span {
        &:first-child,
        &:last-child {
          max-width: 100%;
        }

        &:last-child {
          margin-bottom: 7px;
        }
      }
    }
  }
}

.info-value,
.info-name {
  list-style: none;
  font-size: 16px;
}

.info-value {
  font-weight: lighter;
}

.semester-tab {
  min-height: 120px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  writing-mode: vertical-rl;
  text-orientation: inherit;
  text-transform: uppercase;
  font-weight: lighter;

  &-container {
    max-width: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-btn.v-btn--disabled {
    opacity: .1;
  }
}

@media (max-width: 600px) {
  .clubs-and-activities {
    flex-direction: column;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';

export default defineComponent({
  name: 'tab-general',
  data() {
    return {
      clubTab: 0,
      activityTab: 0,
    };
  },
  setup() {
    return {
      user: userStore(),
    };
  },
  methods: {
    fullMonth(shortMonth: string): string {
      if (shortMonth.startsWith('A')) return `${this.$t('season.autumn')} ${shortMonth.slice(1)}`;
      return `${this.$t('season.spring')} ${shortMonth.slice(1)}`;
    },
    switchClubTab(direction: 'up' | 'down', index: number) {
      if (direction === 'up') {
        if (index === 0) return;
        this.clubTab -= 1;
      } else {
        if (index === Object.keys(this.user.clubs).length - 1) return;
        this.clubTab += 1;
      }
    },
    switchActivityTab(direction: 'up' | 'down', index: number) {
      if (direction === 'up') {
        if (index === 0) return;
        this.activityTab -= 1;
      } else {
        if (index === Object.keys(this.user.activities).length - 1) return;
        this.activityTab += 1;
      }
    },
  },
});
</script>
